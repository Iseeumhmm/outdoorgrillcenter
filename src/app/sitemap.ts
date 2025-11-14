import { MetadataRoute } from 'next'
import { getAllReviewsSlugs, getAllCategories } from '@/lib/payload/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://outdoorgrillcenter.com'

  // Get all review slugs
  const reviewSlugs = await getAllReviewsSlugs()

  // Get all categories
  const categories = await getAllCategories()

  // Map reviews to sitemap entries
  const reviews = reviewSlugs.map((review) => ({
    url: `${siteUrl}/reviews/${review.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Map categories to sitemap entries
  const categoryPages = categories.map((category) => ({
    url: `${siteUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Product type pages
  const productTypes = [
    'pellet-grill',
    'gas-grill',
    'charcoal',
    'kamado',
    'electric',
    'portable',
    'smoker',
  ]

  const productTypePages = productTypes.map((type) => ({
    url: `${siteUrl}/reviews/type/${type}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productTypePages,
    ...categoryPages,
    ...reviews,
  ]
}
