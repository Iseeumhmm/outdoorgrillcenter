import { getCategoryBySlug, getAllCategories } from '@/lib/payload/client'
import CategoryPage from './category'
import { generateArchiveBreadcrumbSchema } from '@/lib/seo/reviewSchema'

/**
 * Generate static paths for all category pages
 * Revalidation is handled by afterChange hooks in the Categories collection
 */
export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

/**
 * Generate metadata for category pages
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const category = await getCategoryBySlug(resolvedParams.slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://outdoorgrillcenter.com'
  const pageUrl = `${siteUrl}/category/${category.slug}`
  const description =
    category.description ||
    `Browse ${category.title} articles and reviews on Outdoor Grill Center`

  return {
    title: `${category.title} - Outdoor Grill Center`,
    description,

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: `${category.title} - Outdoor Grill Center`,
      description,
      url: pageUrl,
      siteName: 'Outdoor Grill Center',
      type: 'website',
      locale: 'en_US',
    },

    twitter: {
      card: 'summary_large_image',
      title: `${category.title}`,
      description,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    keywords: `${category.title}, outdoor grilling, bbq, reviews, guides`,

    authors: [{ name: 'Outdoor Grill Center' }],

    category: category.title,
  }
}

export default async function CategoryRoute({ params }) {
  const resolvedParams = await params
  const category = await getCategoryBySlug(resolvedParams.slug)

  if (!category) {
    return <div>Category not found</div>
  }

  // Generate Schema.org structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://outdoorgrillcenter.com'
  const pageUrl = `${siteUrl}/category/${category.slug}`

  const breadcrumbSchema = generateArchiveBreadcrumbSchema(category.title, pageUrl)

  return (
    <>
      {/* Schema.org JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <CategoryPage category={category} />
    </>
  )
}
