import Container from '@/components/container'
import ReviewCard from '@/components/review/ReviewCard'
import BrowseByType from '@/components/review/BrowseByType'
import { getPaginatedReviews } from '@/lib/payload/client'
import Link from 'next/link'
import {
  generateReviewsCollectionSchema,
  generateArchiveBreadcrumbSchema,
  generateWebSiteSchema,
} from '@/lib/seo/reviewSchema'

/**
 * Reviews Archive Page - Page 1
 * Displays the first page of reviews (fully static)
 *
 * Subsequent pages are handled by /reviews/page/[pageNum]/page.js
 * This allows for full static generation without searchParams
 *
 * Revalidation is handled by afterChange hooks in the Reviews collection
 */

/**
 * Generate static metadata for SEO
 */
export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://outdoorgrillcenter.com'
  const canonicalUrl = `${siteUrl}/reviews`

  const title = 'Grill Reviews - Outdoor Grill Center'
  const description =
    'In-depth reviews of pellet grills, gas grills, charcoal grills, and more. Expert ratings, pros & cons, and buying guides for outdoor cooking equipment.'

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: 'Grill Reviews - Expert Outdoor Grill Reviews',
      description,
      url: canonicalUrl,
      siteName: 'Outdoor Grill Center',
      type: 'website',
      locale: 'en_US',
    },

    twitter: {
      card: 'summary_large_image',
      title,
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

    keywords:
      'grill reviews, pellet grill reviews, gas grill reviews, charcoal grill reviews, outdoor grill ratings, bbq equipment reviews, smoker reviews',

    authors: [{ name: 'Outdoor Grill Center' }],

    category: 'Product Reviews',
  }
}

export default async function ReviewsArchivePage() {
  // This page always shows page 1
  // Subsequent pages are handled by /reviews/page/[pageNum]
  const currentPage = 1
  const pageIndex = 0 // Page 1 = index 0
  const postsPerPage = 12

  // Fetch paginated reviews for page 1
  const reviewData = await getPaginatedReviews({
    pageIndex,
    limit: postsPerPage,
  })

  const { reviews, totalPages } = reviewData

  // Generate Schema.org structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://outdoorgrillcenter.com'
  const pageUrl = `${siteUrl}/reviews`

  const collectionSchema = generateReviewsCollectionSchema(reviews, currentPage, pageUrl)
  const breadcrumbSchema = generateArchiveBreadcrumbSchema('Grill Reviews', pageUrl)
  const websiteSchema = generateWebSiteSchema()

  return (
    <>
      {/* Schema.org JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <Container>
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-bbq-charcoal dark:text-white lg:text-5xl">
            Grill Reviews
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Expert reviews of outdoor grills and cooking equipment. Find the perfect grill for your
            backyard with our detailed analysis, ratings, and buying guides.
          </p>
        </div>

        {/* Reviews Grid */}
        {reviews && reviews.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  aspect="landscape"
                  priority={index < 3}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <PaginationControls totalPages={totalPages} currentPage={currentPage} />
              </div>
            )}
          </>
        ) : (
          <div className="py-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              No reviews yet
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Check back soon for expert grill reviews and buying guides.
            </p>
          </div>
        )}

        {/* Browse by Type Section */}
        <BrowseByType />
      </Container>
    </>
  )
}

/**
 * Pagination Controls Component
 */
function PaginationControls({ totalPages, currentPage }) {
  const nextPage = currentPage + 1
  const hasNext = currentPage < totalPages

  return (
    <nav className="flex items-center justify-center gap-2">
      {/* Previous Button - disabled on page 1 */}
      <span className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 dark:border-gray-800 dark:bg-gray-900">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </span>

      {/* Page Numbers */}
      <div className="hidden items-center gap-1 sm:flex">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
          // Show first page, last page, and pages around current (page 1)
          const showPage = pageNum === 1 || pageNum === totalPages || pageNum === 2

          if (!showPage) {
            // Show ellipsis
            if (pageNum === 3) {
              return (
                <span key={pageNum} className="px-2 text-gray-400">
                  ...
                </span>
              )
            }
            return null
          }

          if (pageNum === 1) {
            return (
              <span
                key={pageNum}
                className="rounded-lg bg-bbq-fire px-4 py-2 text-sm font-bold text-white"
              >
                1
              </span>
            )
          }

          return (
            <Link
              key={pageNum}
              href={`/reviews/page/${pageNum}`}
              className="rounded-lg border border-bbq-cream bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-bbq-fire hover:bg-bbq-cream dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-bbq-fire"
            >
              {pageNum}
            </Link>
          )
        })}
      </div>

      {/* Next Button */}
      {hasNext ? (
        <Link
          href={`/reviews/page/${nextPage}`}
          className="flex items-center gap-2 rounded-lg border border-bbq-cream bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-bbq-fire hover:bg-bbq-fire hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-bbq-fire dark:hover:bg-bbq-fire"
        >
          Next
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <span className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 dark:border-gray-800 dark:bg-gray-900">
          Next
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </nav>
  )
}
