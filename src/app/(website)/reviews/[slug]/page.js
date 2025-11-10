import ReviewPage from "./default";
import { getAllReviewsSlugs, getReviewBySlug } from "@/lib/payload/client";

/**
 * Generate static paths for all review pages
 */
export async function generateStaticParams() {
  const slugs = await getAllReviewsSlugs();
  return slugs;
}

/**
 * Generate metadata for each review page
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const review = await getReviewBySlug(resolvedParams.slug);

  if (!review) {
    return {
      title: "Review Not Found"
    };
  }

  const productName = review.productName || review.title;
  const brand = review.productBrand ? ` - ${review.productBrand}` : "";
  const rating = review.rating ? ` ⭐ ${review.rating}/5` : "";

  return {
    title: `${productName}${brand} Review${rating}`,
    description: review.excerpt || `In-depth review of the ${productName}${brand}. See our rating, pros & cons, and detailed analysis.`,
    openGraph: {
      title: `${productName}${brand} Review`,
      description: review.excerpt,
      type: "article",
      publishedTime: review.publishedAt,
      modifiedTime: review.updatedAt,
      authors: [review.author?.name].filter(Boolean),
      images: review.mainImage
        ? [
            {
              url: review.mainImage.url,
              width: review.mainImage.width,
              height: review.mainImage.height,
              alt: review.mainImage.alt || productName
            }
          ]
        : []
    },
    twitter: {
      card: "summary_large_image",
      title: `${productName}${brand} Review`,
      description: review.excerpt,
      images: review.mainImage?.url ? [review.mainImage.url] : []
    }
  };
}

/**
 * Review detail page route handler
 */
export default async function ReviewRoute({ params }) {
  const resolvedParams = await params;
  const review = await getReviewBySlug(resolvedParams.slug);
  return <ReviewPage review={review} />;
}
