import { cx } from "@/utils/all";

/**
 * AmazonCTA Component
 * Call-to-action button for Amazon affiliate links
 *
 * @param {string} amazonASIN - Amazon ASIN identifier
 * @param {string} productName - Product name for accessibility
 * @param {number} price - Product price (optional)
 * @param {'primary' | 'secondary'} variant - Button style variant
 * @param {string} className - Additional CSS classes
 */
export default function AmazonCTA({
  amazonASIN,
  productName = "this product",
  price,
  variant = "primary",
  className = ""
}) {
  if (!amazonASIN) return null;

  // TODO: Replace with actual Amazon affiliate tag
  const affiliateTag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || "YOUR_AFFILIATE_TAG";
  const amazonUrl = `https://www.amazon.com/dp/${amazonASIN}?tag=${affiliateTag}`;

  const buttonStyles = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl",
    secondary:
      "bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-700"
  };

  return (
    <div className={cx("text-center", className)}>
      {/* CTA Button */}
      <a
        href={amazonUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={cx(
          "inline-flex items-center gap-3 rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-200",
          buttonStyles[variant]
        )}
        aria-label={`Check price of ${productName} on Amazon`}
      >
        {/* Shopping Cart Icon */}
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>

        {/* Button Text */}
        <span>Check Price on Amazon</span>

        {/* External Link Icon */}
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>

      {/* Price Display (if available) */}
      {price && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Was <span className="font-mono font-semibold">${price.toLocaleString()}</span> at time of review
        </p>
      )}

      {/* Affiliate Disclosure */}
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        As an Amazon Associate, we earn from qualifying purchases.
      </p>
    </div>
  );
}

/**
 * Compact variant of Amazon CTA (for cards, sidebars)
 */
export function AmazonCTACompact({
  amazonASIN,
  productName = "this product",
  className = ""
}) {
  if (!amazonASIN) return null;

  const affiliateTag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || "YOUR_AFFILIATE_TAG";
  const amazonUrl = `https://www.amazon.com/dp/${amazonASIN}?tag=${affiliateTag}`;

  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={cx(
        "inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600",
        className
      )}
      aria-label={`Check price of ${productName} on Amazon`}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      View on Amazon
    </a>
  );
}
