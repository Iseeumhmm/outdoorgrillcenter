import { cx } from '@/utils/all'
import StarRating from './StarRating'
import AmazonCTA, { AmazonCTACompact } from './AmazonCTA'

/**
 * ReviewQuickInfo Component
 * "At-a-glance" summary box with verdict, rating, and CTA
 *
 * @param {Object} review - Review object from Payload
 * @param {string} verdict - Quick verdict text (1-2 sentences)
 * @param {string} bestFor - "Best for" use case description
 * @param {boolean} showCTA - Whether to show Amazon CTA button
 * @param {string} className - Additional CSS classes
 */
export default function ReviewQuickInfo({
  review,
  verdict,
  bestFor,
  showCTA = true,
  className = '',
}) {
  if (!review) return null

  // Use excerpt as verdict if not provided
  const verdictText = verdict || review.excerpt

  return (
    <div
      className={cx(
        'overflow-hidden rounded-xl border-2 border-bbq-charcoal/20 bg-gradient-to-br from-bbq-cream to-dark-bg shadow-lg dark:border-bbq-charcoal/40 dark:from-bbq-charcoal dark:to-dark-bg',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-bbq-charcoal/30 bg-bbq-charcoal px-6 py-4 dark:border-bbq-charcoal/50 dark:bg-bbq-charcoal">
        <h3 className="flex items-center gap-2 text-xl font-bold text-bbq-cream dark:text-bbq-cream">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Our Verdict
        </h3>

        {/* Rating Badge */}
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm dark:bg-gray-800">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Rating:</span>
          <StarRating rating={review.rating} size="sm" showNumeric />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6 p-6">
        {/* Verdict Text */}
        {verdictText && (
          <div>
            <p className="text-lg leading-relaxed text-bbq-cream dark:text-bbq-cream">
              {verdictText}
            </p>
          </div>
        )}

        {/* Best For */}
        {bestFor && (
          <div className="rounded-lg bg-bbq-charcoal/30 p-4 dark:bg-bbq-charcoal/50">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-bbq-amber dark:text-bbq-amber">
              Best For:
            </p>
            <p className="text-base text-bbq-cream dark:text-bbq-cream">{bestFor}</p>
          </div>
        )}

        {/* Key Info Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Price */}
          {review.productPrice && (
            <div className="rounded-lg bg-dark-border p-4 shadow-sm dark:bg-dark-border">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-bbq-gray dark:text-bbq-gray">
                Price
              </p>
              <p className="font-mono text-2xl font-bold text-bbq-cream dark:text-white">
                ${review.productPrice.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-bbq-gray dark:text-bbq-gray">at time of review</p>
            </div>
          )}

          {/* Product Type */}
          {review.productType && (
            <div className="rounded-lg bg-dark-border p-4 shadow-sm dark:bg-dark-border">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-bbq-gray dark:text-bbq-gray">
                Type
              </p>
              <p className="text-xl font-semibold text-bbq-cream dark:text-white">
                {formatProductType(review.productType)}
              </p>
            </div>
          )}

          {/* Brand */}
          {review.productBrand && (
            <div className="rounded-lg bg-dark-border p-4 shadow-sm dark:bg-dark-border">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-bbq-gray dark:text-bbq-gray">
                Brand
              </p>
              <p className="text-xl font-semibold text-bbq-cream dark:text-white">
                {review.productBrand}
              </p>
            </div>
          )}

          {/* Model */}
          {review.productModel && (
            <div className="rounded-lg bg-dark-border p-4 shadow-sm dark:bg-dark-border">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-bbq-gray dark:text-bbq-gray">
                Model
              </p>
              <p className="text-xl font-semibold text-bbq-cream dark:text-white">
                {review.productModel}
              </p>
            </div>
          )}
        </div>

        {/* CTA Button */}
        {showCTA && review.amazonASIN && (
          <div className="pt-4">
            <AmazonCTA
              amazonASIN={review.amazonASIN}
              productName={review.productName || review.title}
              variant="primary"
            />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Compact variant for sidebars
 */
export function ReviewQuickInfoCompact({ review, className = '' }) {
  if (!review) return null

  return (
    <div
      className={cx(
        'rounded-lg border border-bbq-charcoal/20 bg-bbq-charcoal/10 p-4 dark:border-bbq-charcoal/40 dark:bg-bbq-charcoal/20',
        className,
      )}
    >
      {/* Rating */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-bbq-charcoal dark:text-bbq-cream">Rating</span>
        <StarRating rating={review.rating} size="sm" showNumeric />
      </div>

      {/* Price */}
      {review.productPrice && (
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-bbq-charcoal dark:text-bbq-cream">Price</span>
          <span className="font-mono font-bold text-bbq-charcoal dark:text-white">
            ${review.productPrice.toLocaleString()}
          </span>
        </div>
      )}

      {/* CTA */}
      {review.amazonASIN && (
        <AmazonCTACompact
          amazonASIN={review.amazonASIN}
          productName={review.productName || review.title}
          className="w-full justify-center"
        />
      )}
    </div>
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
