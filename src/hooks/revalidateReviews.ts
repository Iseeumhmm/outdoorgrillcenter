import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * Hook to revalidate review pages after a review is created or updated
 * This ensures that static pages are updated when content changes
 */
export const revalidateReviewsAfterChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  try {
    // 1. Revalidate the main reviews archive page
    revalidatePath('/reviews')
    req.payload.logger.info('✓ Revalidated /reviews')

    // 2. Revalidate the specific review page
    if (doc.slug) {
      revalidatePath(`/reviews/${doc.slug}`)
      req.payload.logger.info(`✓ Revalidated /reviews/${doc.slug}`)
    }

    // 3. Revalidate product type filter page if productType exists
    if (doc.productType) {
      revalidatePath(`/reviews/type/${doc.productType}`)
      req.payload.logger.info(`✓ Revalidated /reviews/type/${doc.productType}`)
    }

    // 4. If productType changed, revalidate old product type page too
    if (operation === 'update' && previousDoc?.productType && previousDoc.productType !== doc.productType) {
      revalidatePath(`/reviews/type/${previousDoc.productType}`)
      req.payload.logger.info(`✓ Revalidated old product type: /reviews/type/${previousDoc.productType}`)
    }

    // 5. If slug changed, revalidate old review page too
    if (operation === 'update' && previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidatePath(`/reviews/${previousDoc.slug}`)
      req.payload.logger.info(`✓ Revalidated old slug: /reviews/${previousDoc.slug}`)
    }

    // 6. Revalidate sitemap (if review was published/unpublished)
    revalidatePath('/sitemap.xml')
    req.payload.logger.info('✓ Revalidated sitemap')
  } catch (error) {
    // Don't fail the operation if revalidation fails
    console.error('Failed to revalidate paths:', error)
  }

  return doc
}

/**
 * Hook to revalidate review pages after a review is deleted
 */
export const revalidateReviewsAfterDelete: CollectionAfterDeleteHook = async ({
  doc,
  req,
}) => {
  try {
    // 1. Revalidate the main reviews archive page
    revalidatePath('/reviews')
    req.payload.logger.info('✓ Revalidated /reviews after deletion')

    // 2. Revalidate product type filter page if productType exists
    if (doc.productType) {
      revalidatePath(`/reviews/type/${doc.productType}`)
      req.payload.logger.info(`✓ Revalidated /reviews/type/${doc.productType} after deletion`)
    }

    // 3. Revalidate the specific review page (to show 404)
    if (doc.slug) {
      revalidatePath(`/reviews/${doc.slug}`)
      req.payload.logger.info(`✓ Revalidated /reviews/${doc.slug} after deletion`)
    }

    // 4. Revalidate sitemap
    revalidatePath('/sitemap.xml')
    req.payload.logger.info('✓ Revalidated sitemap after deletion')
  } catch (error) {
    console.error('Failed to revalidate paths after delete:', error)
  }
}
