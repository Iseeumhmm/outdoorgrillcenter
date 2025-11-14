import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * Hook to revalidate category pages after a category is created or updated
 * This ensures that static pages are updated when content changes
 */
export const revalidateCategoriesAfterChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  try {
    // 1. Revalidate the specific category page
    if (doc.slug) {
      revalidatePath(`/category/${doc.slug}`)
      req.payload.logger.info(`✓ Revalidated /category/${doc.slug}`)
    }

    // 2. If slug changed, revalidate old category page too
    if (operation === 'update' && previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidatePath(`/category/${previousDoc.slug}`)
      req.payload.logger.info(`✓ Revalidated old category: /category/${previousDoc.slug}`)
    }

    // 3. Revalidate sitemap
    revalidatePath('/sitemap.xml')
    req.payload.logger.info('✓ Revalidated sitemap')
  } catch (error) {
    // Don't fail the operation if revalidation fails
    console.error('Failed to revalidate category paths:', error)
  }

  return doc
}

/**
 * Hook to revalidate category pages after a category is deleted
 */
export const revalidateCategoriesAfterDelete: CollectionAfterDeleteHook = async ({
  doc,
  req,
}) => {
  try {
    // 1. Revalidate the specific category page (to show 404)
    if (doc.slug) {
      revalidatePath(`/category/${doc.slug}`)
      req.payload.logger.info(`✓ Revalidated /category/${doc.slug} after deletion`)
    }

    // 2. Revalidate sitemap
    revalidatePath('/sitemap.xml')
    req.payload.logger.info('✓ Revalidated sitemap after deletion')
  } catch (error) {
    console.error('Failed to revalidate category paths after delete:', error)
  }
}
