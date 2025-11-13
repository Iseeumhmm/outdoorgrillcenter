import { cx } from '@/utils/all'

/**
 * ProductSpecs Component
 * Displays product specifications in a clean table format
 *
 * @param {Object} review - Review object from Payload
 * @param {string} className - Additional CSS classes
 */
export default function ProductSpecs({ review, className = '' }) {
  if (!review) return null

  // Build specs array from available data
  const specs = []

  if (review.productBrand) {
    specs.push({ label: 'Brand', value: review.productBrand })
  }

  if (review.productName) {
    specs.push({ label: 'Product Name', value: review.productName })
  }

  if (review.productModel) {
    specs.push({ label: 'Model Number', value: review.productModel })
  }

  if (review.productType) {
    specs.push({
      label: 'Type',
      value: formatProductType(review.productType),
    })
  }

  if (review.productPrice) {
    specs.push({
      label: 'Price (at review)',
      value: `$${review.productPrice.toLocaleString()}`,
    })
  }

  if (review.amazonASIN) {
    specs.push({ label: 'Amazon ASIN', value: review.amazonASIN })
  }

  if (review.rating) {
    specs.push({
      label: 'Our Rating',
      value: `${review.rating} out of 5 stars`,
    })
  }

  // If no specs, don't render
  if (specs.length === 0) return null

  return (
    <div
      className={cx(
        'overflow-hidden rounded-lg border border-bbq-cream bg-white dark:border-dark-bg dark:bg-dark-bg',
        className,
      )}
    >
      {/* Header */}
      <div className="border-b border-bbq-cream bg-gray-50 px-6 py-4 dark:border-dark-bg dark:bg-dark-bg">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <svg
            className="h-5 w-5 text-gray-600 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          Product Specifications
        </h3>
      </div>

      {/* Specs Table */}
      <dl className="divide-y divide-gray-200 dark:divide-bbq-charcoal">
        {specs.map((spec, idx) => (
          <div
            key={idx}
            className={cx(
              'grid grid-cols-3 gap-4 px-6 py-4 text-sm',
              idx % 2 === 0 ? 'bg-gray-50 dark:bg-bbq-charcoal' : 'bg-white dark:bg-dark-bg',
            )}
          >
            {/* Label */}
            <dt className="font-medium text-gray-700 dark:text-gray-300">{spec.label}</dt>
            {/* Value */}
            <dd className="col-span-2 font-semibold text-gray-900 dark:text-white">{spec.value}</dd>
          </div>
        ))}
      </dl>

      {/* Price Disclaimer */}
      {review.productPrice && (
        <div className="border-t border-bbq-cream bg-gray-50 px-6 py-3 dark:border-bbq-charcoal dark:bg-dark-bg">
          <p className="text-xs italic text-gray-600 dark:text-gray-400">
            * Prices may vary. Check current price on Amazon for the most up-to-date pricing
            information.
          </p>
        </div>
      )}
    </div>
  )
}

/**
 * Format product type slug to readable label
 * e.g., 'pellet-grill' -> 'Pellet Grill'
 */
function formatProductType(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
