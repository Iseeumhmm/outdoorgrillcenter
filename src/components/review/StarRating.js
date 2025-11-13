import { cx } from '@/utils/all'

/**
 * StarRating Component
 * Displays a visual star rating with support for half-stars (0.5 increments)
 *
 * @param {number} rating - Rating value (1-5 with 0.5 increments)
 * @param {'sm'|'md'|'lg'} size - Star size variant
 * @param {boolean} showNumeric - Whether to display numeric rating beside stars
 * @param {string} className - Additional CSS classes
 */
export default function StarRating({ rating, size = 'md', showNumeric = false, className = '' }) {
  // Clamp rating between 1 and 5
  const clampedRating = Math.min(5, Math.max(0, rating || 0))

  // Calculate full, half, and empty stars
  const fullStars = Math.floor(clampedRating)
  const hasHalfStar = clampedRating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  // Size classes for stars
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-8 w-8',
  }

  // Text size for numeric rating
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  }

  const starSize = sizeClasses[size] || sizeClasses.md
  const textSize = textSizeClasses[size] || textSizeClasses.md

  return (
    <div
      className={cx('flex items-center gap-1', className)}
      role="img"
      aria-label={`Rated ${clampedRating} out of 5 stars`}
    >
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} className={starSize} filled />
      ))}

      {/* Half star */}
      {hasHalfStar && <StarIcon key="half" className={starSize} half />}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} className={starSize} />
      ))}

      {/* Numeric rating */}
      {showNumeric && (
        <span className={cx('ml-1 font-medium text-bbq-charcoal', textSize)}>
          {clampedRating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

/**
 * Individual Star Icon
 * Supports filled, half-filled, and empty states
 */
function StarIcon({ filled = false, half = false, className = '' }) {
  if (filled) {
    // Full star - filled with Golden Amber BBQ color
    return (
      <svg
        className={cx(className)}
        style={{ color: '#FFA726' }}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    )
  }

  if (half) {
    // Half star - uses gradient/clip-path for half-fill effect
    return (
      <svg
        className={cx('relative', className)}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="half-fill">
            <stop offset="50%" stopColor="#FFA726" />
            <stop offset="50%" stopColor="#E0E0E0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-fill)"
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>
    )
  }

  // Empty star - outlined only
  return (
    <svg
      className={cx(className)}
      style={{ color: 'rgba(158, 158, 158, 0.2)' }}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
