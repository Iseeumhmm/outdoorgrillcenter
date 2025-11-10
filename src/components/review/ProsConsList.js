import { cx } from "@/utils/all";

/**
 * ProsConsList Component
 * Displays pros and cons in a two-column layout (desktop) or stacked (mobile)
 *
 * @param {Array} pros - Array of pros items from prosAndCons.pros
 * @param {Array} cons - Array of cons items from prosAndCons.cons
 * @param {string} className - Additional CSS classes
 */
export default function ProsConsList({ pros = [], cons = [], className = "" }) {
  // Don't render if both are empty
  if (pros.length === 0 && cons.length === 0) return null;

  return (
    <div className={cx("grid gap-6 md:grid-cols-2", className)}>
      {/* Pros Section */}
      {pros.length > 0 && (
        <div className="flex flex-col rounded-lg border-2 border-bbq-green/20 bg-bbq-green/5 dark:border-bbq-green/30 dark:bg-bbq-green/10">
          {/* Header */}
          <div className="border-b-2 border-bbq-green/20 bg-bbq-green/10 px-6 py-4 dark:border-bbq-green/30 dark:bg-bbq-green/20">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-bbq-green dark:text-bbq-green">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Pros
            </h3>
          </div>

          {/* Pros List */}
          <ul className="flex-1 space-y-3 p-6">
            {pros.map((pro, idx) => (
              <li
                key={pro.id || idx}
                className="flex items-start gap-3 text-gray-900 dark:text-gray-100"
              >
                {/* Checkmark Icon */}
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-bbq-green"
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

                {/* Pro Text */}
                <span className="leading-relaxed">{pro.item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cons Section */}
      {cons.length > 0 && (
        <div className="flex flex-col rounded-lg border-2 border-bbq-fire/20 bg-bbq-fire/5 dark:border-bbq-fire/30 dark:bg-bbq-fire/10">
          {/* Header */}
          <div className="border-b-2 border-bbq-fire/20 bg-bbq-fire/10 px-6 py-4 dark:border-bbq-fire/30 dark:bg-bbq-fire/20">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-bbq-fire dark:text-bbq-fire">
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
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Cons
            </h3>
          </div>

          {/* Cons List */}
          <ul className="flex-1 space-y-3 p-6">
            {cons.map((con, idx) => (
              <li
                key={con.id || idx}
                className="flex items-start gap-3 text-gray-900 dark:text-gray-100"
              >
                {/* X Icon */}
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-bbq-fire"
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

                {/* Con Text */}
                <span className="leading-relaxed">{con.item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * Compact variant for preview/cards
 * Shows only first few items
 */
export function ProsConsListCompact({
  pros = [],
  cons = [],
  maxItems = 3,
  className = ""
}) {
  const limitedPros = pros.slice(0, maxItems);
  const limitedCons = cons.slice(0, maxItems);

  if (limitedPros.length === 0 && limitedCons.length === 0) return null;

  return (
    <div className={cx("space-y-2 text-sm", className)}>
      {/* Pros */}
      {limitedPros.map((pro, idx) => (
        <div key={`pro-${idx}`} className="flex items-start gap-2">
          <svg
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-bbq-green"
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

      {/* Cons */}
      {limitedCons.map((con, idx) => (
        <div key={`con-${idx}`} className="flex items-start gap-2">
          <svg
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-bbq-fire"
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

      {/* Show "more" indicator if items were truncated */}
      {(pros.length > maxItems || cons.length > maxItems) && (
        <p className="text-xs italic text-gray-500 dark:text-gray-400">
          + {Math.max(pros.length + cons.length - maxItems * 2, 0)} more
        </p>
      )}
    </div>
  );
}
