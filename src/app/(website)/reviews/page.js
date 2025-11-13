import Container from '@/components/container'
import ReviewCard from '@/components/review/ReviewCard'
import { getPaginatedReviews } from '@/lib/payload/client'
import Pagination from '@/components/blog/pagination'

/**
 * Reviews Archive Page
 * Displays all reviews with pagination
 */
export const metadata = {
  title: 'Grill Reviews - Outdoor Grill Center',
  description:
    'In-depth reviews of pellet grills, gas grills, charcoal grills, and more. Expert ratings, pros & cons, and buying guides for outdoor cooking equipment.',
}

export default async function ReviewsArchivePage({ searchParams }) {
  // Get current page from query params (default to 1)
  const resolvedSearchParams = await searchParams
  const currentPage = parseInt(resolvedSearchParams.page) || 1
  const pageIndex = currentPage - 1 // Convert to 0-based index
  const postsPerPage = 12

  // Fetch paginated reviews
  const reviewData = await getPaginatedReviews({
    pageIndex,
    limit: postsPerPage,
  })

  const { reviews, totalPages, page } = reviewData

  return (
    <>
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
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} aspect="landscape" />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination totalPages={totalPages} currentPage={page} basePath="/reviews" />
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
        <div className="mt-16 border-t border-bbq-cream pt-12 dark:border-gray-800">
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
            Browse by Type
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <BrowseTypeCard type="pellet-grill" label="Pellet Grills" icon="🔥" />
            <BrowseTypeCard type="gas-grill" label="Gas Grills" icon="⚡" />
            <BrowseTypeCard type="charcoal" label="Charcoal Grills" icon="🪵" />
            <BrowseTypeCard type="kamado" label="Kamado Grills" icon="🏺" />
            <BrowseTypeCard type="electric" label="Electric Grills" icon="🔌" />
            <BrowseTypeCard type="portable" label="Portable Grills" icon="🎒" />
            <BrowseTypeCard type="smoker" label="Smokers" icon="💨" />
          </div>
        </div>
      </Container>
    </>
  )
}

/**
 * Browse by Type Card Component
 */
function BrowseTypeCard({ type, label, icon }) {
  return (
    <a
      href={`/reviews/type/${type}`}
      className="group flex flex-col items-center gap-3 rounded-lg border border-bbq-cream bg-white p-6 text-center transition-all hover:border-bbq-fire hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-bbq-fire"
    >
      <span className="text-4xl">{icon}</span>
      <span className="font-semibold text-gray-900 group-hover:text-bbq-fire dark:text-white">
        {label}
      </span>
    </a>
  )
}
