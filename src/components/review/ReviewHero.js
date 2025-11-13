import Image from 'next/image'
import { urlForImage } from '@/lib/payload/image'
import { format, parseISO } from 'date-fns'
import { cx } from '@/utils/all'
import StarRating from './StarRating'
import ProductTypeBadge from './ProductTypeBadge'
import CategoryLabel from '../blog/category'

/**
 * ReviewHero Component
 * Prominent hero section for review detail pages with product overview
 *
 * @param {Object} review - Review object from Payload
 * @param {boolean} showImage - Whether to display the main product image (default: true)
 */
export default function ReviewHero({ review, showImage = true }) {
  if (!review) return null

  const imageProps = review?.mainImage ? urlForImage(review.mainImage) : null
  const authorImageProps =
    review?.author?.image && typeof review.author.image === 'object'
      ? urlForImage(review.author.image)
      : null

  const productName = review.productName || review.title

  return (
    <div className="mb-12">
      {/* Category Labels */}
      {review.categories && review.categories.length > 0 && (
        <div className="mb-6 flex flex-wrap justify-center gap-3 md:justify-start">
          {review.categories.map((category) => (
            <CategoryLabel
              key={typeof category === 'object' ? category.id : category}
              category={category}
            />
          ))}
        </div>
      )}

      {/* Product Type and Brand Badges */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        {review.productType && <ProductTypeBadge productType={review.productType} />}
        {review.productBrand && (
          <span className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {review.productBrand}
          </span>
        )}
      </div>

      {/* Product Name (Large Heading) */}
      <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-bbq-charcoal md:text-5xl dark:text-white">
        {productName}
      </h1>

      {/* Star Rating (Large) */}
      <div className="mb-6">
        <StarRating rating={review.rating} size="lg" showNumeric />
      </div>

      {/* Model and Price Row */}
      <div className="mb-6 flex flex-wrap items-center gap-4 text-base">
        {review.productModel && (
          <div className="flex items-center gap-2">
            <span className="text-bbq-charcoal dark:text-gray-400">Model:</span>
            <span className="font-semibold text-bbq-charcaol dark:text-gray-100">
              {review.productModel}
            </span>
          </div>
        )}
        {review.productPrice && (
          <div className="flex items-center gap-2">
            <span className="text-bbq-charcoal dark:text-gray-400">Price:</span>
            <span className="font-semibold text-bbq-charcaol dark:text-gray-100">
              ${review.productPrice.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">at time of review</span>
          </div>
        )}
      </div>

      {/* Excerpt/Summary */}
      {review.excerpt && (
        <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300 md:text-xl">
          {review.excerpt}
        </p>
      )}

      {/* Metadata Row: Author, Date, Reading Time */}
      <div className="flex flex-wrap items-center gap-4 border-b border-bbq-cream pb-6 text-sm text-bbq-charcoal dark:border-gray-800 dark:text-gray-400">
        {/* Author */}
        {review.author && typeof review.author === 'object' && (
          <div className="flex items-center gap-2">
            {authorImageProps && (
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={authorImageProps.src}
                  alt={review.author.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-500">Written by</span>
              <span className="font-semibold text-bbq-charcaol dark:text-gray-100">
                {review.author.name}
              </span>
            </div>
          </div>
        )}

        {/* Date */}
        {review.publishedAt && (
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time dateTime={review.publishedAt} className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-500">Published</span>
              <span className="font-medium">
                {format(parseISO(review.publishedAt), 'MMMM dd, yyyy')}
              </span>
            </time>
          </div>
        )}

        {/* Reading Time */}
        {review.estReadingTime && (
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-500">Reading time</span>
              <span className="font-medium">{review.estReadingTime} minutes</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Product Image */}
      {showImage && (
        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl shadow-lg mb-[-3rem]">
          {imageProps ? (
            <Image
              src={imageProps.src}
              alt={review.mainImage?.alt || productName}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
              {...(review.mainImage?.blurDataURL && {
                placeholder: 'blur',
                blurDataURL: review.mainImage.blurDataURL,
              })}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
              <svg
                className="h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
