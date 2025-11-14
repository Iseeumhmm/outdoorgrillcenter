import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Review, Author, Category, Media, Setting } from '@/payload-types'

/**
 * Get all published reviews with populated relationships
 * @param limit - Maximum number of reviews to return (default: 100)
 * @returns Array of reviews with author, categories, and mainImage populated
 */
export async function getAllReviews(limit: number = 100) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs: reviews } = await payload.find({
      collection: 'reviews',
      depth: 2,
      limit,
      sort: '-publishedAt',
      where: {
        publishedAt: {
          exists: true,
        },
      },
    })

    return reviews
  } catch (error) {
    console.warn('Failed to fetch reviews:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
}

/**
 * Get paginated reviews
 * @param pageIndex - Page offset (0-based)
 * @param limit - Number of reviews per page
 * @returns Object with reviews array and pagination info
 */
export async function getPaginatedReviews({
  pageIndex = 0,
  limit = 10,
}: {
  pageIndex?: number
  limit?: number
}) {
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'reviews',
      depth: 2,
      limit,
      page: pageIndex + 1, // Payload uses 1-based page numbers
      sort: '-publishedAt',
      where: {
        publishedAt: {
          exists: true,
        },
      },
    })

    return {
      reviews: result.docs,
      total: result.totalDocs,
      page: result.page,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    }
  } catch (error) {
    console.warn('Failed to fetch paginated reviews:', error instanceof Error ? error.message : 'Unknown error')
    return {
      reviews: [],
      total: 0,
      page: 1,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    }
  }
}

/**
 * Get a single review by slug
 * @param slug - Review slug
 * @returns Review object with all relationships populated, or null if not found
 */
export async function getReviewBySlug(slug: string) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'reviews',
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return docs[0] || null
  } catch (error) {
    console.warn('Failed to fetch review by slug:', error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}

/**
 * Get all review slugs for static generation
 * @returns Array of objects with slug property
 */
export async function getAllReviewsSlugs() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'reviews',
    depth: 0,
    limit: 1000,
    select: {
      slug: true,
    },
  })

  return docs.map((review) => ({ slug: review.slug }))
}

/**
 * Get all authors with their images
 * @returns Array of authors
 */
export async function getAllAuthors() {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs: authors } = await payload.find({
      collection: 'authors',
      depth: 1,
      limit: 100,
      sort: 'name',
    })

    return authors
  } catch (error) {
    console.warn('Failed to fetch authors:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
}

/**
 * Get a single author by slug
 * @param slug - Author slug
 * @returns Author object with image and bio, or null if not found
 */
export async function getAuthorBySlug(slug: string) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'authors',
      depth: 1,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return docs[0] || null
  } catch (error) {
    console.warn('Failed to fetch author by slug:', error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}

/**
 * Get all categories with review counts
 * @returns Array of categories
 */
export async function getAllCategories() {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs: categories } = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      sort: 'title',
    })

    // Get review counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const { totalDocs } = await payload.find({
          collection: 'reviews',
          depth: 0,
          limit: 0,
          where: {
            categories: {
              contains: category.id,
            },
          },
        })

        return {
          ...category,
          count: totalDocs,
        }
      }),
    )

    return categoriesWithCounts
  } catch (error) {
    console.warn('Failed to fetch categories:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
}

/**
 * Get a single category by slug
 * @param slug - Category slug
 * @returns Category object or null if not found
 */
export async function getCategoryBySlug(slug: string) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return docs[0] || null
  } catch (error) {
    console.warn('Failed to fetch category by slug:', error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}

/**
 * Get site settings global
 * @returns Settings object with populated images, or default values if DB doesn't exist
 */
export async function getSettings() {
  try {
    const payload = await getPayload({ config: configPromise })

    const settings = await payload.findGlobal({
      slug: 'settings',
      depth: 1,
    })

    return settings
  } catch (error) {
    // Return default settings if database doesn't exist yet (first build)
    console.warn('Failed to fetch settings, using defaults:', error instanceof Error ? error.message : 'Unknown error')
    return {
      title: 'Stablo - Blog Template',
      description: 'Stablo - popular open-source next.js and sanity blog template',
      url: 'https://stablo-pro.web3templates.com',
      copyright: 'Stablo',
      resendApiKey: '',
    } as any
  }
}

/**
 * Get related reviews based on shared categories
 * @param reviewId - Current review ID to exclude
 * @param categories - Array of category IDs or objects
 * @param limit - Number of related reviews to return (default: 3)
 * @returns Array of related reviews
 */
export async function getRelatedReviews(
  reviewId: string,
  categories: Array<string | Category>,
  limit: number = 3,
) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Extract category IDs if objects are passed
    const categoryIds = categories.map((cat) => (typeof cat === 'string' ? cat : cat.id))

    if (categoryIds.length === 0) {
      return []
    }

    const { docs } = await payload.find({
      collection: 'reviews',
      depth: 1,
      limit,
      where: {
        and: [
          {
            id: {
              not_equals: reviewId,
            },
          },
          {
            categories: {
              in: categoryIds,
            },
          },
        ],
      },
    })

    return docs
  } catch (error) {
    console.warn('Failed to fetch related reviews:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
}

/**
 * Get reviews filtered by product type
 * @param productType - Product type slug (e.g., 'pellet-grill', 'gas-grill')
 * @param limit - Maximum number of reviews to return (default: 100)
 * @returns Array of reviews matching the product type
 */
export async function getReviewsByProductType(productType: string, limit: number = 100) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs: reviews } = await payload.find({
      collection: 'reviews',
      depth: 2,
      limit,
      sort: '-publishedAt',
      where: {
        and: [
          {
            publishedAt: {
              exists: true,
            },
          },
          {
            productType: {
              equals: productType,
            },
          },
        ],
      },
    })

    return reviews
  } catch (error) {
    console.warn('Failed to fetch reviews by product type:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
}

/**
 * Get reviews filtered by brand
 * @param brand - Product brand name
 * @param limit - Maximum number of reviews to return (default: 100)
 * @returns Array of reviews matching the brand
 */
export async function getReviewsByBrand(brand: string, limit: number = 100) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs: reviews } = await payload.find({
      collection: 'reviews',
      depth: 2,
      limit,
      sort: '-publishedAt',
      where: {
        and: [
          {
            publishedAt: {
              exists: true,
            },
          },
          {
            productBrand: {
              equals: brand,
            },
          },
        ],
      },
    })

    return reviews
  } catch (error) {
    console.warn('Failed to fetch reviews by brand:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
}

/**
 * Get top-rated reviews
 * @param limit - Maximum number of reviews to return (default: 10)
 * @returns Array of reviews sorted by rating (highest first)
 */
export async function getTopRatedReviews(limit: number = 10) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs: reviews } = await payload.find({
      collection: 'reviews',
      depth: 2,
      limit,
      sort: '-rating',
      where: {
        publishedAt: {
          exists: true,
        },
      },
    })

    return reviews
  } catch (error) {
    console.warn('Failed to fetch top-rated reviews:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
}

/**
 * Get all unique product types that have published reviews
 * @returns Array of product type strings
 */
export async function getAvailableProductTypes() {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs: reviews } = await payload.find({
      collection: 'reviews',
      depth: 0,
      limit: 1000,
      select: {
        productType: true,
      },
      where: {
        and: [
          {
            publishedAt: {
              exists: true,
            },
          },
          {
            productType: {
              exists: true,
            },
          },
        ],
      },
    })

    // Get unique product types
    const uniqueTypes = [...new Set(reviews.map((review) => review.productType).filter(Boolean))]
    return uniqueTypes
  } catch (error) {
    console.warn('Failed to fetch available product types:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
}

/**
 * Get total number of review pages for static generation
 * @param pageSize - Number of reviews per page (default: 12)
 * @returns Total number of pages
 */
export async function getTotalReviewPages(pageSize: number = 12) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { totalDocs } = await payload.find({
      collection: 'reviews',
      depth: 0,
      limit: 0,
      where: {
        publishedAt: {
          exists: true,
        },
      },
    })

    return Math.ceil(totalDocs / pageSize)
  } catch (error) {
    console.warn('Failed to get total review pages:', error instanceof Error ? error.message : 'Unknown error')
    return 1
  }
}

// Legacy aliases for backward compatibility
export const getAllPosts = getAllReviews
export const getPaginatedPosts = getPaginatedReviews
export const getPostBySlug = getReviewBySlug
export const getAllPostsSlugs = getAllReviewsSlugs
export const getRelatedPosts = getRelatedReviews
