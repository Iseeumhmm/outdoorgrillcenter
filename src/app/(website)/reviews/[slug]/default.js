import { notFound } from "next/navigation";
import Container from "@/components/container";
import { RichText } from "@/lib/payload/RichTextRenderer";
import AuthorCard from "@/components/blog/authorCard";
import Link from "next/link";

// Review-specific components
import ReviewHero from "@/components/review/ReviewHero";
import ReviewQuickInfo from "@/components/review/ReviewQuickInfo";
import ProsConsList from "@/components/review/ProsConsList";
import ProductSpecs from "@/components/review/ProductSpecs";
import AmazonCTA from "@/components/review/AmazonCTA";

// Schema.org structured data
import {
  generateReviewSchema,
  generateBreadcrumbSchema
} from "@/lib/seo/reviewSchema";

/**
 * Review Detail Page Component
 * Full implementation with all components + Schema.org markup
 */
export default async function ReviewPage({ review }) {
  if (!review) {
    return notFound();
  }

  // Generate structured data for SEO
  const reviewSchema = generateReviewSchema(review);
  const breadcrumbSchema = generateBreadcrumbSchema(
    review,
    review.productType
  );

  return (
    <>
      {/* Schema.org JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      {/* Page Content */}
      <Container className="!pt-0">
        {/* Hero Section with Product Overview */}
        <div className="mx-auto max-w-screen-md">
          <ReviewHero review={review} showImage={true} />
        </div>
      </Container>

      <Container>
        <div className="mx-auto max-w-screen-md">
          {/* Quick Info / Verdict Box */}
          <div className="mb-12">
            <ReviewQuickInfo
              review={review}
              verdict={review.excerpt}
              showCTA={!!review.amazonASIN}
            />
          </div>

          {/* Pros and Cons */}
          {(review.prosAndCons?.pros?.length > 0 ||
            review.prosAndCons?.cons?.length > 0) && (
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Pros & Cons
              </h2>
              <ProsConsList
                pros={review.prosAndCons?.pros || []}
                cons={review.prosAndCons?.cons || []}
              />
            </div>
          )}

          {/* Main Review Content */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Detailed Review
            </h2>
            <div className="prose prose-lg mx-auto dark:prose-invert">
              {review.body && <RichText value={review.body} />}
            </div>
          </div>

          {/* Product Specifications */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Specifications
            </h2>
            <ProductSpecs review={review} />
          </div>

          {/* Amazon CTA (additional placement) */}
          {review.amazonASIN && (
            <div className="mb-12">
              <AmazonCTA
                amazonASIN={review.amazonASIN}
                productName={review.productName || review.title}
                price={review.productPrice}
                variant="primary"
              />
            </div>
          )}

          {/* Author Bio */}
          {review.author && typeof review.author === "object" && (
            <div className="mb-12 border-t border-gray-200 pt-8 dark:border-gray-800">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                About the Author
              </h2>
              <AuthorCard author={review.author} />
            </div>
          )}

          {/* Navigation Links */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-800">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 font-medium text-bbq-charcoal hover:underline dark:text-white"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              All Reviews
            </Link>

            {review.productType && (
              <Link
                href={`/reviews/type/${review.productType}`}
                className="inline-flex items-center gap-2 font-medium text-bbq-charcoal hover:underline dark:text-white"
              >
                More {formatProductType(review.productType)} Reviews
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

/**
 * Format product type slug to readable label
 */
function formatProductType(slug) {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
