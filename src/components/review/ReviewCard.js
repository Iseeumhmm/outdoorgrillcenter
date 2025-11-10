import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/payload/image";
import StarRating from "./StarRating";
import ProductTypeBadge from "./ProductTypeBadge";

/**
 * ReviewCard Component
 * Displays a review in list/grid view with rating, product info, and preview of pros/cons
 *
 * @param {Object} review - Review object from Payload
 * @param {string} aspect - Image aspect ratio: 'landscape' | 'square' | 'custom'
 * @param {boolean} minimal - Minimal variant without pros/cons preview
 * @param {boolean} pathPrefix - Path prefix for review links (default: '/reviews')
 */
export default function ReviewCard({
  review,
  aspect = "landscape",
  minimal = false,
  pathPrefix = "/reviews"
}) {
  const imageProps = review?.mainImage ? urlForImage(review.mainImage) : null;

  // Get first 2 pros and cons for preview
  const previewPros = review?.prosAndCons?.pros?.slice(0, 2) || [];
  const previewCons = review?.prosAndCons?.cons?.slice(0, 1) || [];

  return (
    <div
      className={cx(
        "group cursor-pointer overflow-hidden rounded-lg border border-[#6D4C41]/30 bg-white shadow-sm transition-all duration-300 hover:shadow-[0_10px_25px_rgba(109,76,65,0.15)] hover:-translate-y-0.5 dark:border-gray-800 dark:bg-gray-900"
      )}
    >
      <Link href={`${pathPrefix}/${review.slug}`}>
        {/* Product Image */}
        <div
          className={cx(
            "relative overflow-hidden bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800",
            aspect === "landscape" ? "aspect-video" : "aspect-square"
          )}
        >
          {imageProps ? (
            <Image
              src={imageProps.src}
              alt={review.mainImage?.alt || review.productName || "Product"}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              {...(review.mainImage?.blurDataURL && {
                placeholder: "blur",
                blurDataURL: review.mainImage.blurDataURL
              })}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5">
          {/* Product Type and Brand */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {review.productType && (
              <ProductTypeBadge productType={review.productType} />
            )}
            {review.productBrand && (
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                {review.productBrand}
              </span>
            )}
          </div>

          {/* Star Rating */}
          <div className="mb-3">
            <StarRating rating={review.rating} size="sm" showNumeric />
          </div>

          {/* Review Title */}
          <h3
            className={cx(
              "mb-3 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-[#2D2D2D] dark:text-white",
              "bg-gradient-to-r from-[#D32F2F] to-[#D32F2F] bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_3px]"
            )}
          >
            {review.title}
          </h3>

          {/* Excerpt */}
          {review.excerpt && (
            <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
              {review.excerpt}
            </p>
          )}

          {/* Pros/Cons Preview (if not minimal) */}
          {!minimal && (previewPros.length > 0 || previewCons.length > 0) && (
            <div className="mb-4 space-y-1 text-sm">
              {previewPros.map((pro, idx) => (
                <div key={`pro-${idx}`} className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0"
                    style={{ color: '#7CB342' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="line-clamp-1 text-gray-700 dark:text-gray-300">
                    {pro.item}
                  </span>
                </div>
              ))}
              {previewCons.map((con, idx) => (
                <div key={`con-${idx}`} className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0"
                    style={{ color: '#D32F2F' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="line-clamp-1 text-gray-700 dark:text-gray-300">
                    {con.item}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Metadata Footer */}
          <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
            {/* Price */}
            {review.productPrice && (
              <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">
                ${review.productPrice.toLocaleString()}
              </span>
            )}

            {/* Author */}
            {review.author && (
              <span className="flex items-center gap-1">
                {typeof review.author === "object" && review.author.name}
              </span>
            )}

            {/* Reading Time */}
            {review.estReadingTime && (
              <span>{review.estReadingTime} min read</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
