import Container from '@/components/container'
import ReviewCard from '@/components/review/ReviewCard'
import BrowseByType from '@/components/review/BrowseByType'
import { getPaginatedReviews, getTotalReviewPages } from '@/lib/payload/client'
import Link from 'next/link'
import {
  generateReviewsCollectionSchema,
  generateArchiveBreadcrumbSchema,
  generateWebSiteSchema,
} from '@/lib/seo/reviewSchema'

/**
 * Reviews Archive Page - Paginated
 * Displays paginated reviews for pages 2+
 * Page 1 is handled by /reviews/page.js
 */

// Enable Incremental Static Regeneration (ISR)
// Revalidate every hour to keep content fresh
export const revalidate = 3600

const POSTS_PER_PAGE = 12

/**
 * Generate static paths for all review pages
 */
export async function generateStaticParams() {
  const totalPages = await getTotalReviewPages(POSTS_PER_PAGE)

  // Generate params for pages 2 through totalPages
  // Page 1 is handled by /reviews/page.js
  const params = []
  for (let i = 2; i <= totalPages; i++) {
    params.push({ pageNum: i.toString() })
  }

  return params
}

/**
 * Generate dynamic metadata for SEO
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const currentPage = parseInt(resolvedParams.pageNum) || 2
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://outdoorgrillcenter.com'
  const canonicalUrl = `${siteUrl}/reviews/page/${currentPage}`

  const title = `Grill Reviews - Page ${currentPage} - Outdoor Grill Center`
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

export default async function ReviewsPaginatedPage({ params }) {
  // Get current page from params (default to 2)
  const resolvedParams = await params
  const currentPage = parseInt(resolvedParams.pageNum) || 2
  const pageIndex = currentPage - 1 // Convert to 0-based index

  // Fetch paginated reviews
  const reviewData = await getPaginatedReviews({
    pageIndex,
    limit: POSTS_PER_PAGE,
  })

  const { reviews, totalPages, page } = reviewData

  // Generate Schema.org structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://outdoorgrillcenter.com'
  const pageUrl = `${siteUrl}/reviews/page/${currentPage}`

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
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-bbq-fire">
            Home
          </Link>
          <span>/</span>
          <Link href="/reviews" className="hover:text-bbq-fire">
            Reviews
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900 dark:text-white">Page {currentPage}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-bbq-charcoal dark:text-white lg:text-5xl">
            Grill Reviews
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Expert reviews of outdoor grills and cooking equipment. Find the perfect grill for your
            backyard with our detailed analysis, ratings, and buying guides.
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Reviews Grid */}
        {reviews && reviews.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} aspect="landscape" priority={false} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <PaginationControls totalPages={totalPages} currentPage={page} />
              </div>
            )}
          </>
        ) : (
          <div className="py-12 text-center">
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              No reviews on this page
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              <Link href="/reviews" className="text-bbq-fire hover:underline">
                Return to page 1
              </Link>
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
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      {hasPrev ? (
        <Link
          href={prevPage === 1 ? '/reviews' : `/reviews/page/${prevPage}`}
          className="flex items-center gap-2 rounded-lg border border-bbq-cream bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-bbq-fire hover:bg-bbq-fire hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-bbq-fire dark:hover:bg-bbq-fire"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </Link>
      ) : (
        <span className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 dark:border-gray-800 dark:bg-gray-900">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="hidden items-center gap-1 sm:flex">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
          // Show first page, last page, current page, and pages around current
          const showPage =
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)

          if (!showPage) {
            // Show ellipsis
            if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
              return (
                <span key={pageNum} className="px-2 text-gray-400">
                  ...
                </span>
              )
            }
            return null
          }

          if (pageNum === currentPage) {
            return (
              <span
                key={pageNum}
                className="rounded-lg bg-bbq-fire px-4 py-2 text-sm font-bold text-white"
              >
                {pageNum}
              </span>
            )
          }

          return (
            <Link
              key={pageNum}
              href={pageNum === 1 ? '/reviews' : `/reviews/page/${pageNum}`}
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
