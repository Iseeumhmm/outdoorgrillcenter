import type { Review } from "@/payload-types";

/**
 * Schema.org structured data for Review pages
 * Enables rich snippets with star ratings in Google search results
 */

interface ReviewSchemaData {
  "@context": string;
  "@type": string;
  itemReviewed: object;
  reviewRating: object;
  author: object;
  publisher: object;
  datePublished: string;
  dateModified?: string;
  reviewBody: string;
  positiveNotes?: object;
  negativeNotes?: object;
}

/**
 * Generate Schema.org Review structured data
 * @param review - Review object from Payload
 * @returns Schema.org JSON-LD object
 */
export function generateReviewSchema(review: Review): ReviewSchemaData {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://outdoorgrillcenter.com";

  // Get image URL (handle both string and object)
  const imageUrl = getImageUrl(review.mainImage, siteUrl);

  // Build Amazon URL if ASIN exists
  const affiliateTag =
    process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || "YOUR_AFFILIATE_TAG";
  const amazonUrl = review.amazonASIN
    ? `https://www.amazon.com/dp/${review.amazonASIN}?tag=${affiliateTag}`
    : null;

  const productName = review.productName || review.title;

  const schema: ReviewSchemaData = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: productName,
      ...(review.productBrand && {
        brand: {
          "@type": "Brand",
          name: review.productBrand
        }
      }),
      ...(imageUrl && {
        image: imageUrl
      }),
      ...(review.excerpt && {
        description: review.excerpt
      }),
      ...(review.productModel && {
        sku: review.productModel,
        mpn: review.productModel
      }),
      ...(review.productPrice && {
        offers: {
          "@type": "Offer",
          ...(amazonUrl && { url: amazonUrl }),
          priceCurrency: "USD",
          price: review.productPrice.toFixed(2),
          availability: "https://schema.org/InStock",
          ...(amazonUrl && {
            seller: {
              "@type": "Organization",
              name: "Amazon"
            }
          })
        }
      }),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: review.rating.toString(),
        bestRating: "5",
        worstRating: "1",
        ratingCount: "1"
      }
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating.toString(),
      bestRating: "5",
      worstRating: "1"
    },
    author: {
      "@type": "Person",
      name:
        typeof review.author === "object" ? review.author.name : "Unknown",
      ...(typeof review.author === "object" &&
        review.author.slug && {
          url: `${siteUrl}/author/${review.author.slug}`
        })
    },
    publisher: {
      "@type": "Organization",
      name: "Outdoor Grill Center",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png` // TODO: Update with actual logo path
      }
    },
    datePublished: review.publishedAt || review.createdAt,
    ...(review.updatedAt &&
      review.updatedAt !== review.createdAt && {
        dateModified: review.updatedAt
      }),
    reviewBody: extractPlainText(review.body) || review.excerpt || ""
  };

  // Add positive notes (pros)
  if (review.prosAndCons?.pros && review.prosAndCons.pros.length > 0) {
    schema.positiveNotes = {
      "@type": "ItemList",
      itemListElement: review.prosAndCons.pros.map((pro, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: pro.item
      }))
    };
  }

  // Add negative notes (cons)
  if (review.prosAndCons?.cons && review.prosAndCons.cons.length > 0) {
    schema.negativeNotes = {
      "@type": "ItemList",
      itemListElement: review.prosAndCons.cons.map((con, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: con.item
      }))
    };
  }

  return schema;
}

/**
 * Generate BreadcrumbList schema for review pages
 * @param review - Review object from Payload
 * @param productType - Optional product type for additional breadcrumb
 * @returns Schema.org JSON-LD object
 */
export function generateBreadcrumbSchema(
  review: Review,
  productType?: string
): object {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://outdoorgrillcenter.com";

  const breadcrumbs = [
    { name: "Home", url: siteUrl },
    { name: "Reviews", url: `${siteUrl}/reviews` }
  ];

  if (productType) {
    breadcrumbs.push({
      name: formatProductType(productType),
      url: `${siteUrl}/reviews/type/${productType}`
    });
  }

  breadcrumbs.push({
    name: review.title,
    url: `${siteUrl}/reviews/${review.slug}`
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

/**
 * Generate Organization schema (for site-wide use)
 * @returns Schema.org JSON-LD object
 */
export function generateOrganizationSchema(): object {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://outdoorgrillcenter.com";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Outdoor Grill Center",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`, // TODO: Update with actual logo path
    sameAs: [
      // TODO: Add social media URLs
      // "https://www.facebook.com/outdoorgrillcenter",
      // "https://twitter.com/outdoorgrillctr",
      // "https://www.youtube.com/@outdoorgrillcenter"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service"
      // email: "info@outdoorgrillcenter.com"
    }
  };
}

/**
 * Generate WebSite schema with search action (for site-wide use)
 * @returns Schema.org JSON-LD object
 */
export function generateWebSiteSchema(): object {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://outdoorgrillcenter.com";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Outdoor Grill Center",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Extract plain text from Lexical/RichText for reviewBody
 * Truncate to reasonable length for schema (Google limit: 5000 chars)
 */
function extractPlainText(richText: any): string {
  if (!richText) return "";

  // If it's already a string, return it
  if (typeof richText === "string") return richText;

  // If it's Lexical JSON, extract text from nodes
  if (richText.root?.children) {
    const text = extractTextFromLexical(richText.root.children);
    // Truncate to 5000 characters for schema (Google limit)
    return text.length > 5000 ? text.substring(0, 4997) + "..." : text;
  }

  return "";
}

/**
 * Recursively extract text from Lexical nodes
 */
function extractTextFromLexical(nodes: any[]): string {
  let text = "";

  for (const node of nodes) {
    if (node.text) {
      text += node.text + " ";
    }
    if (node.children) {
      text += extractTextFromLexical(node.children);
    }
  }

  return text.trim();
}

/**
 * Get image URL from Media object or string
 */
function getImageUrl(
  image: any,
  siteUrl: string
): string | null {
  if (!image) return null;

  // If it's a Media object with url
  if (typeof image === "object" && image.url) {
    // If URL is already absolute, return as-is
    if (image.url.startsWith("http")) {
      return image.url;
    }
    // Otherwise, prepend site URL
    return `${siteUrl}${image.url}`;
  }

  // If it's just a string (shouldn't happen, but handle gracefully)
  if (typeof image === "string") {
    if (image.startsWith("http")) {
      return image;
    }
    return `${siteUrl}${image}`;
  }

  return null;
}

/**
 * Format product type slug to readable label
 * e.g., 'pellet-grill' -> 'Pellet Grill'
 */
function formatProductType(slug: string): string {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Generate CollectionPage schema with ItemList for reviews archive page
 * @param reviews - Array of Review objects
 * @param currentPage - Current page number (1-based)
 * @param pageUrl - Full URL of current page
 * @returns Schema.org JSON-LD object
 */
export function generateReviewsCollectionSchema(
  reviews: Review[],
  currentPage: number,
  pageUrl: string
): object {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://outdoorgrillcenter.com";

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Grill Reviews${currentPage > 1 ? ` - Page ${currentPage}` : ""} - Outdoor Grill Center`,
    description:
      "In-depth reviews of pellet grills, gas grills, charcoal grills, and more. Expert ratings, pros & cons, and buying guides for outdoor cooking equipment.",
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: reviews.length,
      itemListElement: reviews.map((review, index) => {
        const imageUrl = getImageUrl(review.mainImage, siteUrl);
        const productName = review.productName || review.title;

        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Review",
            "@id": `${siteUrl}/reviews/${review.slug}`,
            url: `${siteUrl}/reviews/${review.slug}`,
            name: review.title,
            itemReviewed: {
              "@type": "Product",
              name: productName,
              ...(review.productBrand && {
                brand: {
                  "@type": "Brand",
                  name: review.productBrand
                }
              }),
              ...(imageUrl && { image: imageUrl }),
              ...(review.excerpt && { description: review.excerpt }),
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: review.rating?.toString() || "0",
                bestRating: "5",
                worstRating: "1",
                ratingCount: "1"
              }
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating?.toString() || "0",
              bestRating: "5",
              worstRating: "1"
            },
            author: {
              "@type": "Person",
              name:
                typeof review.author === "object"
                  ? review.author.name
                  : "Outdoor Grill Center"
            },
            ...(review.publishedAt && {
              datePublished: review.publishedAt
            })
          }
        };
      })
    }
  };
}

/**
 * Generate BreadcrumbList schema for archive pages
 * @param pageName - Name of the current page
 * @param pageUrl - URL of the current page
 * @param parentPage - Optional parent page { name, url }
 * @returns Schema.org JSON-LD object
 */
export function generateArchiveBreadcrumbSchema(
  pageName: string,
  pageUrl: string,
  parentPage?: { name: string; url: string }
): object {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://outdoorgrillcenter.com";

  const breadcrumbs = [{ name: "Home", url: siteUrl }];

  if (parentPage) {
    breadcrumbs.push(parentPage);
  }

  breadcrumbs.push({ name: pageName, url: pageUrl });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}
