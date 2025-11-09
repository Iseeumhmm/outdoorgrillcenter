import 'server-only'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import type { Post, Author, Category, Media, Setting } from '@/payload-types'

/**
 * Get all published posts with populated relationships
 * @param limit - Maximum number of posts to return (default: 100)
 * @returns Array of posts with author, categories, and mainImage populated
 */
export async function getAllPosts(limit: number = 100) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const { docs: posts } = await payload.find({
      collection: 'posts',
      depth: 2,
      limit,
      sort: '-publishedAt',
      where: {
        publishedAt: {
          exists: true,
        },
      },
    })

    return posts
  } catch (error) {
    console.warn('Failed to fetch posts:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
}

/**
 * Get paginated posts
 * @param pageIndex - Page offset (0-based)
 * @param limit - Number of posts per page
 * @returns Object with posts array and pagination info
 */
export async function getPaginatedPosts({
  pageIndex = 0,
  limit = 10,
}: {
  pageIndex?: number
  limit?: number
}) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const result = await payload.find({
      collection: 'posts',
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
      posts: result.docs,
      total: result.totalDocs,
      page: result.page,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    }
  } catch (error) {
    console.warn('Failed to fetch paginated posts:', error instanceof Error ? error.message : 'Unknown error')
    return {
      posts: [],
      total: 0,
      page: 1,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    }
  }
}

/**
 * Get a single post by slug
 * @param slug - Post slug
 * @returns Post object with all relationships populated, or null if not found
 */
export async function getPostBySlug(slug: string) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'posts',
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
    console.warn('Failed to fetch post by slug:', error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}

/**
 * Get all post slugs for static generation
 * @returns Array of objects with slug property
 */
export async function getAllPostsSlugs() {
  const payload = await getPayloadHMR({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 1000,
    select: {
      slug: true,
    },
  })

  return docs.map((post) => ({ slug: post.slug }))
}

/**
 * Get all authors with their images
 * @returns Array of authors
 */
export async function getAllAuthors() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

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
    const payload = await getPayloadHMR({ config: configPromise })

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
 * Get all categories with post counts
 * @returns Array of categories
 */
export async function getAllCategories() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const { docs: categories } = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      sort: 'title',
    })

    // Get post counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const { totalDocs } = await payload.find({
          collection: 'posts',
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
    const payload = await getPayloadHMR({ config: configPromise })

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
    const payload = await getPayloadHMR({ config: configPromise })

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
      w3ckey: '',
    } as any
  }
}

/**
 * Get related posts based on shared categories
 * @param postId - Current post ID to exclude
 * @param categories - Array of category IDs or objects
 * @param limit - Number of related posts to return (default: 3)
 * @returns Array of related posts
 */
export async function getRelatedPosts(
  postId: string,
  categories: Array<string | Category>,
  limit: number = 3,
) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    // Extract category IDs if objects are passed
    const categoryIds = categories.map((cat) => (typeof cat === 'string' ? cat : cat.id))

    if (categoryIds.length === 0) {
      return []
    }

    const { docs } = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      where: {
        and: [
          {
            id: {
              not_equals: postId,
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
    console.warn('Failed to fetch related posts:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
}
