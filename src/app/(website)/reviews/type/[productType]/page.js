import Container from '@/components/container'
import ReviewCard from '@/components/review/ReviewCard'
import { getReviewsByProductType, getAvailableProductTypes } from '@/lib/payload/client'
import Link from 'next/link'

/**
 * Generate static paths for all product type pages
 */
export async function generateStaticParams() {
  const productTypes = await getAvailableProductTypes()
  return productTypes.map((type) => ({ productType: type }))
}

/**
 * Generate metadata for product type pages
 */
export async function generateMetadata({ params }) {
  const productType = params.productType
  const formattedType = formatProductType(productType)

  return {
    title: `${formattedType} Reviews - Outdoor Grill Center`,
    description: `Expert reviews of ${formattedType.toLowerCase()}s. Compare ratings, features, pros & cons, and find the best ${formattedType.toLowerCase()} for your outdoor cooking needs.`,
  }
}

/**
 * Product Type Filter Page
 * Displays reviews filtered by product type (e.g., pellet grills, gas grills)
 */
export default async function ProductTypeFilterPage({ params }) {
  const productType = params.productType
  const reviews = await getReviewsByProductType(productType, 100)
  const formattedType = formatProductType(productType)

  return (
    <>
      <Container>
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-[#D32F2F]">
            Home
          </Link>
          <span>/</span>
          <Link href="/reviews" className="hover:text-[#D32F2F]">
            Reviews
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900 dark:text-white">{formattedType}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-[#2D2D2D] mb-4 text-4xl font-bold tracking-tight dark:text-white lg:text-5xl">
            {formattedType} Reviews
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {getProductTypeDescription(productType)}
          </p>
        </div>

        {/* Reviews Grid */}
        {reviews && reviews.length > 0 ? (
          <>
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Showing {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} aspect="landscape" />
              ))}
            </div>
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
              No {formattedType} Reviews Yet
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Check back soon for expert reviews of {formattedType.toLowerCase()}s.
            </p>
            <Link href="/reviews" className="text-[#2D2D2D] mt-4 inline-block hover:underline">
              ← Browse All Reviews
            </Link>
          </div>
        )}

        {/* Browse Other Types */}
        <div className="mt-16 border-t border-bbq-cream pt-12 dark:border-gray-800">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Browse Other Types
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <TypeLink type="pellet-grill" label="Pellet Grills" current={productType} />
            <TypeLink type="gas-grill" label="Gas Grills" current={productType} />
            <TypeLink type="charcoal" label="Charcoal Grills" current={productType} />
            <TypeLink type="kamado" label="Kamado Grills" current={productType} />
            <TypeLink type="electric" label="Electric Grills" current={productType} />
            <TypeLink type="portable" label="Portable Grills" current={productType} />
            <TypeLink type="smoker" label="Smokers" current={productType} />
          </div>
        </div>
      </Container>
    </>
  )
}

/**
 * Type Link Component
 */
function TypeLink({ type, label, current }) {
  const isCurrent = type === current

  if (isCurrent) {
    return (
      <div className="rounded-lg border-2 border-[#D32F2F] bg-[#D32F2F]/10 px-4 py-3 text-center font-semibold text-[#D32F2F]">
        {label}
      </div>
    )
  }

  return (
    <Link
      href={`/reviews/type/${type}`}
      className="rounded-lg border border-bbq-cream bg-white px-4 py-3 text-center font-medium text-gray-700 transition-colors hover:border-[#D32F2F] hover:bg-[#D32F2F]/5 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
    >
      {label}
    </Link>
  )
}

/**
 * Format product type slug to readable label
 */
function formatProductType(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Get description text for each product type
 */
function getProductTypeDescription(productType) {
  const descriptions = {
    'pellet-grill':
      'Pellet grills combine the convenience of gas with the flavor of wood smoke. Perfect for low-and-slow smoking and versatile outdoor cooking.',
    'gas-grill':
      'Gas grills offer quick heating, precise temperature control, and easy cleanup. Ideal for everyday grilling and weeknight dinners.',
    charcoal:
      'Charcoal grills deliver authentic smoky flavor and high-heat searing. The classic choice for traditional grilling enthusiasts.',
    kamado:
      'Kamado grills are ceramic cookers that excel at both high-heat searing and low-and-slow smoking with exceptional fuel efficiency.',
    electric:
      "Electric grills are perfect for apartments, condos, and areas where open flames aren't allowed. Easy to use with minimal smoke.",
    portable:
      'Portable grills are compact, lightweight, and perfect for tailgating, camping, or small outdoor spaces.',
    smoker:
      'Dedicated smokers are designed for low-and-slow cooking, producing tender, flavorful meats with deep smoke penetration.',
  }

  return (
    descriptions[productType] ||
    `Expert reviews of ${formatProductType(productType).toLowerCase()}s with detailed ratings, pros & cons, and buying advice.`
  )
}
