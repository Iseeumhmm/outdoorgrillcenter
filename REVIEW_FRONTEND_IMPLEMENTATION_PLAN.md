# Review Frontend Implementation Plan
**Outdoor Grill Center - Review Components Redesign**

---

## Executive Summary

This document outlines a comprehensive plan to update the frontend components to properly display all fields from the Reviews collection. The implementation will create review-specific components that showcase product information, ratings, pros/cons, and other metadata while maintaining visual consistency with the existing site design and modern review UX patterns.

---

## Table of Contents

1. [Current State Analysis](#1-current-state-analysis)
2. [Review Collection Fields](#2-review-collection-fields)
3. [Design Principles & UX Patterns](#3-design-principles--ux-patterns)
4. [Component Architecture](#4-component-architecture)
5. [Implementation Phases](#5-implementation-phases)
6. [Detailed Component Specifications](#6-detailed-component-specifications)
7. [Routing Structure](#7-routing-structure)
8. [Data Fetching Updates](#8-data-fetching-updates)
9. [Styling Guidelines](#9-styling-guidelines)
10. [Testing & Validation](#10-testing--validation)
11. [Schema.org Structured Data Implementation](#11-schemaorg-structured-data-implementation)

---

## 1. Current State Analysis

### Existing Architecture
- **Framework**: Next.js 15 App Router
- **Styling**: Tailwind CSS v4 (utility-first)
- **Content**: Currently displays blog posts via `/post/[slug]`
- **Components**: Reusable card components (PostList, Featured, PostAlt)
- **Layout**: Responsive grid-based layouts with dark mode support

### Key Design Patterns in Use
- Image aspect ratios: landscape (video), square, custom
- Hover effects: scale-up images, gradient text underlines
- Grid layouts: 2-column responsive design
- Author/metadata display with avatars
- Category labels with color badges
- RichText content rendering with prose styling

### Gaps for Reviews
- No rating display component
- No pros/cons display
- No product metadata section
- No product type filtering
- No dedicated review routes

---

## 2. Review Collection Fields

### Core Content Fields
| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `title` | text | Yes | Review headline |
| `slug` | text | Yes | URL-friendly identifier |
| `excerpt` | textarea | No | Brief summary (200-300 chars) |
| `body` | richText | Yes | Full review content |
| `mainImage` | upload | Yes | Product/hero image |

### Review-Specific Fields
| Field | Type | Required | Display Priority |
|-------|------|----------|------------------|
| `rating` | number (1-5, 0.5 step) | Yes | High - Hero section |
| `productName` | text | Yes | High - Title area |
| `productBrand` | text | Yes | High - Badge/label |
| `productModel` | text | No | Medium - Specs section |
| `amazonASIN` | text | No | Medium - CTA button |
| `productPrice` | number | No | High - Hero section |
| `productType` | select | No | High - Category badge |

### Structured Data Fields
| Field | Type | Structure |
|-------|------|-----------|
| `prosAndCons` | group | Contains `pros` and `cons` arrays |
| `prosAndCons.pros` | array | Array of text items |
| `prosAndCons.cons` | array | Array of text items |

### Metadata Fields
| Field | Type | Purpose |
|-------|------|---------|
| `author` | relationship | Author attribution |
| `categories` | relationship (hasMany) | Taxonomy/filtering |
| `publishedAt` | date | Publication date |
| `estReadingTime` | number | UX metadata |
| `featured` | checkbox | Homepage display |

---

## 3. Design Principles & UX Patterns

### Industry Review UX Standards
Based on analysis of leading review sites (Wirecutter, CNET, Good Housekeeping):

1. **At-a-Glance Information**
   - Rating prominently displayed (visual stars + numeric)
   - Product name and brand immediately visible
   - Price displayed near CTA
   - Key specs in scannable format

2. **Structured Content**
   - Pros/cons lists in side-by-side columns or cards
   - Clear visual distinction (green checkmarks, red X's)
   - Quick verdict/summary box
   - Detailed review content follows

3. **Trust Signals**
   - Author credentials visible
   - Publication date
   - Review methodology link (future)
   - Affiliate disclosure (when applicable)

4. **Actionable CTAs**
   - "Check Price on Amazon" buttons
   - Multiple purchase options (future)
   - Comparison links (future)

### Visual Consistency Requirements
- Maintain existing Tailwind utility patterns
- Use brand colors: `brand-primary`, `brand-secondary`
- Support dark mode throughout
- Preserve hover effects and animations
- Keep responsive grid layouts (2-col desktop, 1-col mobile)
- Use existing typography hierarchy

---

## 4. Component Architecture

### New Review-Specific Components

#### 4.1 **ReviewCard** (List View)
**Purpose**: Display review in archive/grid views
**Extends**: PostList component patterns
**New Elements**:
- Star rating display (visual + numeric)
- Product brand badge
- Price display
- Product type badge
- Quick pros/cons preview (first 2 items)

#### 4.2 **ReviewHero** (Detail Page Top)
**Purpose**: Prominent product overview
**Extends**: Post header patterns
**Elements**:
- Product name (large heading)
- Star rating (large, interactive tooltip)
- Product brand + model
- Price with timestamp
- Product type badge
- Quick verdict box
- Amazon CTA button (if ASIN exists)

#### 4.3 **ProsConsList**
**Purpose**: Structured pros/cons display
**Layout**: 2-column on desktop, stacked on mobile
**Elements**:
- Green section with checkmark icons for pros
- Red/orange section with X icons for cons
- Responsive grid layout
- Clear headings

#### 4.4 **ProductSpecs**
**Purpose**: Technical specifications display
**Layout**: Card or table format
**Elements**:
- Product type
- Brand
- Model number
- Price (with disclaimer)
- ASIN (if available)

#### 4.5 **StarRating** (Reusable)
**Purpose**: Visual rating display
**Variants**:
- Large (detail page hero)
- Medium (cards)
- Small (metadata)
**Features**:
- Half-star support (0.5 increments)
- Accessible (ARIA labels)
- Color: gold/yellow stars on dark background

#### 4.6 **ReviewQuickInfo**
**Purpose**: At-a-glance summary box
**Layout**: Highlighted card/box
**Elements**:
- Overall rating
- Price
- Best for: [use case]
- Our verdict: [1-2 sentences]
- CTA button

### Enhanced Existing Components

#### 4.7 **CategoryLabel** (Enhancement)
- Add support for `productType` display
- Visual distinction from regular categories
- Icon support for product types

#### 4.8 **AuthorCard** (Enhancement)
- Add expertise badges for reviewers
- Display review count

---

## 5. Implementation Phases

### Phase 1: Core Review Components ⭐ Priority
**Timeline**: Week 1
**Components**:
- StarRating component (all variants)
- ReviewCard component
- Basic review detail page structure
- Update routing for `/reviews/[slug]`

**Deliverables**:
- Single review page displays all fields
- Review cards in grids work properly
- Rating displays correctly

### Phase 2: Product Information Display
**Timeline**: Week 2
**Components**:
- ReviewHero component
- ProductSpecs component
- Amazon CTA integration
- Price display with disclaimer

**Deliverables**:
- Product metadata fully visible
- Professional hero section
- Working affiliate links

### Phase 3: Pros/Cons & Structured Content
**Timeline**: Week 2
**Components**:
- ProsConsList component
- ReviewQuickInfo summary box
- Enhanced RichText sections

**Deliverables**:
- Pros/cons displayed beautifully
- Quick verdict box implemented
- Content hierarchy clear

### Phase 4: Filtering & Navigation
**Timeline**: Week 3
**Routes**:
- `/reviews` - main archive
- `/reviews/type/[productType]` - filtered by type
- `/reviews/brand/[brand]` - filtered by brand (future)

**Components**:
- Filter sidebar/dropdown
- Sort controls (rating, date, price)
- Breadcrumb navigation

**Deliverables**:
- Browse reviews by type
- Sort and filter functionality
- SEO-friendly URLs

### Phase 5: Polish & Optimization
**Timeline**: Week 3-4
**Tasks**:
- Mobile responsive testing
- Dark mode refinement
- Loading states & animations
- Performance optimization
- Accessibility audit (WCAG AA)
- Schema.org markup for reviews

---

## 6. Detailed Component Specifications

### 6.1 StarRating Component

**File**: `src/components/review/StarRating.tsx`

```tsx
// Props interface
interface StarRatingProps {
  rating: number;        // 1-5 with 0.5 increments
  size?: 'sm' | 'md' | 'lg';
  showNumeric?: boolean; // Show "4.5" next to stars
  className?: string;
}

// Visual design
- Full stars: ⭐ (filled gold)
- Half stars: ⭐ (half-filled via gradient or clip-path)
- Empty stars: ☆ (outlined)
- Colors: text-yellow-400 (light), text-yellow-500 (dark mode)

// Sizes
- sm: h-4 w-4 (for cards)
- md: h-5 w-5 (default)
- lg: h-8 w-8 (for hero)

// Accessibility
- aria-label: "Rated 4.5 out of 5 stars"
- role: "img"
```

**Key Features**:
- SVG-based for crispness
- Support half-star rendering via clip-path or dual-layer approach
- Hover tooltips on detail pages
- Screen reader friendly

---

### 6.2 ReviewCard Component

**File**: `src/components/review/ReviewCard.tsx`

**Layout Structure**:
```
┌─────────────────────────────────┐
│  [Product Image - aspect-video] │
│  [hover: scale-105]             │
├─────────────────────────────────┤
│ 🏷️ Pellet Grill | Weber        │
├─────────────────────────────────┤
│ ⭐⭐⭐⭐⭐ 4.5                    │
│                                 │
│ Review Title Here               │
│ [gradient underline on hover]   │
│                                 │
│ ✅ Pro 1                        │
│ ✅ Pro 2                        │
│ ❌ Con 1                        │
│                                 │
│ $599 • Author • Date            │
└─────────────────────────────────┘
```

**Styling Notes**:
- Maintain existing hover effects from PostList
- Add subtle border or shadow to differentiate from posts
- Product type badge: different color from category labels
- Brand name: semibold, color-coded by brand (optional)
- Price: prominent, use monospace font

---

### 6.3 ReviewHero Component

**File**: `src/components/review/ReviewHero.tsx`

**Layout Structure** (Desktop):
```
┌──────────────────────────────────────────────────────┐
│  Categories: Pellet Grills, Outdoor Cooking          │
├──────────────────────────────────────────────────────┤
│                                                       │
│  [Brand Badge: WEBER]                                │
│                                                       │
│  Weber Genesis II E-335                              │
│  [Large H1, brand-primary color]                     │
│                                                       │
│  ⭐⭐⭐⭐⭐ 4.5 out of 5                               │
│                                                       │
│  Model: 61016001 • $599 at time of review           │
│                                                       │
│  [Author info with avatar] • March 15, 2024 • 8 min │
└──────────────────────────────────────────────────────┘
```

**Below Hero - Quick Info Box**:
```
┌──────────────────────────────────────────────────────┐
│  OUR VERDICT                          Rating: ⭐ 4.5  │
├──────────────────────────────────────────────────────┤
│  The Weber Genesis II E-335 delivers exceptional     │
│  performance for backyard grillers who want          │
│  restaurant-quality results.                         │
│                                                       │
│  Best For: Families and weekend entertainers         │
│                                                       │
│  [🛒 Check Price on Amazon]                          │
└──────────────────────────────────────────────────────┘
```

**Styling**:
- Quick info box: `bg-brand-secondary/10` with border
- CTA button: `bg-orange-500 hover:bg-orange-600` (Amazon-style)
- Rating: large, gold stars with drop shadow
- Product name: 3xl-4xl font size
- Brand badge: uppercase, colored background

---

### 6.4 ProsConsList Component

**File**: `src/components/review/ProsConsList.tsx`

**Layout Structure** (Desktop 2-column):
```
┌─────────────────────────┬─────────────────────────┐
│  ✅ PROS                │  ❌ CONS                │
├─────────────────────────┼─────────────────────────┤
│  ✓ Excellent heat       │  ✗ Heavy (120 lbs)      │
│    control              │                          │
│                         │  ✗ Expensive            │
│  ✓ Durable stainless    │                          │
│    steel construction   │  ✗ Assembly takes       │
│                         │    2-3 hours            │
│  ✓ Large cooking area   │                          │
│    (669 sq in)          │                          │
│                         │                          │
│  ✓ Side burner included │                          │
└─────────────────────────┴─────────────────────────┘
```

**Styling**:
- Pros section: `bg-green-50 dark:bg-green-900/20` with green border
- Cons section: `bg-red-50 dark:bg-red-900/20` with red border
- Icons: Use Heroicons (CheckCircleIcon, XCircleIcon)
- List items: text-base, line-height-relaxed
- Mobile: Stack vertically
- Rounded corners: rounded-lg
- Padding: p-6

---

### 6.5 ProductSpecs Component

**File**: `src/components/review/ProductSpecs.tsx`

**Layout Structure**:
```
┌──────────────────────────────────────────────────────┐
│  PRODUCT SPECIFICATIONS                              │
├──────────────────────────────────────────────────────┤
│  Brand:         Weber                                │
│  Model:         Genesis II E-335 (61016001)          │
│  Type:          Gas Grill                            │
│  Price:         $599 (at time of review)             │
│  Amazon ASIN:   B01N2W0B61                           │
│                                                       │
│  * Prices may vary. Check current price on Amazon.  │
└──────────────────────────────────────────────────────┘
```

**Styling**:
- Table or definition list (`<dl>` semantic HTML)
- Alternating row colors: `even:bg-gray-50 dark:even:bg-gray-800`
- Labels: font-medium, text-gray-700
- Values: text-gray-900, dark mode variants
- Border: border border-gray-200 dark:border-gray-700
- Disclaimer: text-xs, text-gray-500, italic

---

## 7. Routing Structure

### New Routes to Implement

```
/reviews
  ├── [slug]/                    # Individual review detail page
  │   ├── page.tsx               # Review detail page component
  │   └── default.tsx            # Review default export
  │
  ├── page.tsx                   # Reviews archive (all reviews)
  │
  ├── type/
  │   └── [productType]/         # Filter by product type
  │       └── page.tsx           # e.g., /reviews/type/pellet-grill
  │
  └── brand/                     # (Future)
      └── [brand]/
          └── page.tsx           # e.g., /reviews/brand/weber
```

### URL Examples
- `/reviews` - All reviews archive
- `/reviews/weber-genesis-ii-e-335-review` - Single review
- `/reviews/type/pellet-grill` - All pellet grill reviews
- `/reviews/type/gas-grill` - All gas grill reviews
- `/reviews/brand/weber` - All Weber product reviews (future)

### Breadcrumb Pattern
```
Home > Reviews > Pellet Grills > Traeger Pro 575 Review
```

---

## 8. Data Fetching Updates

### Update `src/lib/payload/client.ts`

Current functions already support reviews (aliased as posts). Ensure these are being used:

```typescript
// These already exist with review support:
getAllReviews(limit)
getPaginatedReviews(pageIndex, limit)
getReviewBySlug(slug)
getAllReviewsSlugs()
getRelatedReviews(reviewId, categories, limit)
```

### New Functions Needed

```typescript
// Filter by product type
export async function getReviewsByProductType(
  productType: string,
  limit: number = 100
): Promise<Review[]>

// Filter by brand
export async function getReviewsByBrand(
  brand: string,
  limit: number = 100
): Promise<Review[]>

// Get top-rated reviews
export async function getTopRatedReviews(
  limit: number = 10
): Promise<Review[]>

// Get reviews by rating
export async function getReviewsByRating(
  minRating: number,
  limit: number = 100
): Promise<Review[]>
```

### Query Parameters
- Sort: `-rating` (highest rated first), `-publishedAt` (newest first)
- Filter: `where: { productType: { equals: 'pellet-grill' } }`
- Filter: `where: { rating: { greater_than_equal: 4 } }`

---

## 9. Styling Guidelines

### Color Palette for Reviews

**Ratings**:
- Stars: `text-yellow-400` / `text-yellow-500`
- 5-star: `text-green-600`
- 4-star: `text-green-500`
- 3-star: `text-yellow-500`
- 1-2 star: `text-orange-500`

**Pros/Cons**:
- Pros background: `bg-green-50 dark:bg-green-900/20`
- Pros border: `border-green-200 dark:border-green-800`
- Pros icon: `text-green-600 dark:text-green-400`
- Cons background: `bg-red-50 dark:bg-red-900/20`
- Cons border: `border-red-200 dark:border-red-800`
- Cons icon: `text-red-600 dark:text-red-400`

**Product Type Badges**:
- Pellet Grill: `bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`
- Gas Grill: `bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`
- Charcoal: `bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200`
- Kamado: `bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`
- Electric: `bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200`
- Portable: `bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`

**CTAs**:
- Amazon button: `bg-orange-500 hover:bg-orange-600 text-white`
- Secondary buttons: `bg-brand-secondary/20 text-blue-600`

### Typography Hierarchy

**Review Detail Page**:
```
Product Name:     text-3xl lg:text-4xl font-semibold
Section Headings: text-2xl font-semibold
Subsections:      text-xl font-medium
Body Text:        text-base leading-relaxed
Metadata:         text-sm text-gray-600
Small Print:      text-xs text-gray-500
```

### Spacing & Layout

**Container Widths**:
- Hero section: `max-w-screen-lg`
- Content: `max-w-screen-md`
- Full-width sections: `max-w-screen-xl`

**Gaps**:
- Between sections: `gap-8 lg:gap-12`
- Between cards: `gap-6 lg:gap-8`
- Within cards: `gap-4`

---

## 10. Testing & Validation

### Functionality Testing
- [ ] All review fields display correctly
- [ ] Star ratings render accurately (including half-stars)
- [ ] Pros/cons lists display properly
- [ ] Amazon links work (affiliate tracking intact)
- [ ] Product type filtering works
- [ ] Sort functionality works
- [ ] Related reviews display
- [ ] Author cards link properly
- [ ] Category filtering works

### Responsive Testing
- [ ] Mobile (320px - 768px)
  - Cards stack vertically
  - Pros/cons list stacks
  - Images scale properly
  - Text remains readable
- [ ] Tablet (768px - 1024px)
  - 2-column layouts work
  - Navigation is accessible
- [ ] Desktop (1024px+)
  - Full layout displays properly
  - Hover effects work

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility (NVDA, JAWS)
- [ ] ARIA labels present on rating stars
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Focus indicators visible
- [ ] Semantic HTML used (headings hierarchy)
- [ ] Alt text on all images

### Performance Testing
- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 90 (Accessibility)
- [ ] Images optimized (Next.js Image component)
- [ ] Lazy loading implemented
- [ ] No layout shift (CLS < 0.1)
- [ ] Fast page load (< 2s)

### Dark Mode Testing
- [ ] All components render correctly in dark mode
- [ ] Color contrast maintained
- [ ] Images display properly
- [ ] No "light mode leaking"

### SEO Validation
- [ ] Schema.org Review markup implemented
- [ ] Meta descriptions present
- [ ] Open Graph tags for social sharing
- [ ] Canonical URLs set
- [ ] XML sitemap includes review pages
- [ ] Product ratings visible in search results (rich snippets)

---

## 11. Schema.org Structured Data Implementation

### 11.1 Overview

Implementing Schema.org structured data for reviews is critical for:
- **Rich Snippets**: Display star ratings in Google search results
- **SEO Benefits**: Improved visibility and click-through rates
- **Trust Signals**: Professional appearance in SERPs
- **Voice Search**: Better compatibility with voice assistants
- **Knowledge Graph**: Potential inclusion in Google's Knowledge Graph

### 11.2 Schema Types to Implement

#### Primary Schema: `Review`
- **Type**: https://schema.org/Review
- **Purpose**: Represents the review article itself

#### Secondary Schema: `Product`
- **Type**: https://schema.org/Product
- **Purpose**: Represents the product being reviewed
- **Note**: Nested within the Review schema

#### Tertiary Schema: `Rating`
- **Type**: https://schema.org/Rating (AggregateRating for multiple reviews)
- **Purpose**: Provides numerical rating information

#### Supporting Schema: `Organization` / `Person`
- **Type**: https://schema.org/Organization or https://schema.org/Person
- **Purpose**: Identifies the review author/publisher

---

### 11.3 Complete Schema Structure

#### Full JSON-LD Schema Template

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Product",
    "name": "Weber Genesis II E-335",
    "brand": {
      "@type": "Brand",
      "name": "Weber"
    },
    "image": "https://outdoorgrillcenter.com/images/weber-genesis-ii-e-335.jpg",
    "description": "Premium 3-burner gas grill with side burner",
    "sku": "61016001",
    "gtin13": "00077924054129",
    "offers": {
      "@type": "Offer",
      "url": "https://www.amazon.com/dp/B01N2W0B61",
      "priceCurrency": "USD",
      "price": "599.00",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Amazon"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "1"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Person",
    "name": "John Smith",
    "url": "https://outdoorgrillcenter.com/author/john-smith"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Outdoor Grill Center",
    "logo": {
      "@type": "ImageObject",
      "url": "https://outdoorgrillcenter.com/logo.png"
    }
  },
  "datePublished": "2024-03-15",
  "dateModified": "2024-03-20",
  "reviewBody": "The Weber Genesis II E-335 delivers exceptional performance for backyard grillers...",
  "positiveNotes": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Excellent heat control"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Durable stainless steel construction"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Large cooking area (669 sq in)"
      }
    ]
  },
  "negativeNotes": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Heavy (120 lbs)"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Expensive"
      }
    ]
  }
}
```

---

### 11.4 Field Mapping: Payload to Schema.org

| Payload Field | Schema.org Property | Schema Type | Notes |
|--------------|---------------------|-------------|-------|
| `title` | `itemReviewed.name` | Product | Product name |
| `productName` | `itemReviewed.name` | Product | Use this if different from title |
| `productBrand` | `itemReviewed.brand.name` | Brand | Brand name |
| `productModel` | `itemReviewed.sku` | Product | Model number as SKU |
| `productPrice` | `itemReviewed.offers.price` | Offer | Price in USD/CAD |
| `amazonASIN` | `itemReviewed.offers.url` | Offer | Amazon product URL |
| `rating` | `reviewRating.ratingValue` | Rating | Numeric rating (1-5) |
| `mainImage` | `itemReviewed.image` | ImageObject | Product image URL |
| `body` | `reviewBody` | Review | Full review text (plain text or excerpt) |
| `excerpt` | `itemReviewed.description` | Product | Product description |
| `publishedAt` | `datePublished` | Review | ISO 8601 date |
| `updatedAt` | `dateModified` | Review | ISO 8601 date |
| `author.name` | `author.name` | Person | Author name |
| `prosAndCons.pros` | `positiveNotes` | ItemList | Array of pros |
| `prosAndCons.cons` | `negativeNotes` | ItemList | Array of cons |

---

### 11.5 Implementation Approach

#### Option 1: Server-Side JSON-LD Script Tag (Recommended)

**File**: `src/app/(website)/reviews/[slug]/page.tsx`

```tsx
import { Metadata } from 'next';
import { getReviewBySlug } from '@/lib/payload/client';
import { generateReviewSchema } from '@/lib/seo/reviewSchema';

export async function generateMetadata({ params }): Promise<Metadata> {
  const review = await getReviewBySlug(params.slug);

  return {
    title: `${review.productName} Review - ${review.productBrand}`,
    description: review.excerpt,
    // Additional meta tags...
  };
}

export default async function ReviewPage({ params }) {
  const review = await getReviewBySlug(params.slug);
  const schemaData = generateReviewSchema(review);

  return (
    <>
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Page content */}
      <ReviewHero review={review} />
      {/* ... rest of the page */}
    </>
  );
}
```

#### Option 2: Reusable Schema Component

**File**: `src/components/seo/ReviewSchema.tsx`

```tsx
interface ReviewSchemaProps {
  review: Review;
}

export function ReviewSchema({ review }: ReviewSchemaProps) {
  const schemaData = generateReviewSchema(review);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
```

**Usage**:
```tsx
import { ReviewSchema } from '@/components/seo/ReviewSchema';

export default async function ReviewPage({ params }) {
  const review = await getReviewBySlug(params.slug);

  return (
    <>
      <ReviewSchema review={review} />
      <ReviewHero review={review} />
      {/* ... */}
    </>
  );
}
```

---

### 11.6 Schema Generator Utility

**File**: `src/lib/seo/reviewSchema.ts`

```typescript
import { Review } from '@/payload-types';
import { urlForImage } from '@/lib/payload/image';

interface ReviewSchemaData {
  '@context': string;
  '@type': string;
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

export function generateReviewSchema(review: Review): ReviewSchemaData {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://outdoorgrillcenter.com';
  const imageUrl = review.mainImage ? urlForImage(review.mainImage).src : null;
  const amazonUrl = review.amazonASIN
    ? `https://www.amazon.com/dp/${review.amazonASIN}?tag=YOUR_AFFILIATE_TAG`
    : null;

  const schema: ReviewSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: review.productName || review.title,
      ...(review.productBrand && {
        brand: {
          '@type': 'Brand',
          name: review.productBrand,
        },
      }),
      ...(imageUrl && {
        image: `${siteUrl}${imageUrl}`,
      }),
      ...(review.excerpt && {
        description: review.excerpt,
      }),
      ...(review.productModel && {
        sku: review.productModel,
        mpn: review.productModel,
      }),
      ...(review.productPrice && {
        offers: {
          '@type': 'Offer',
          ...(amazonUrl && { url: amazonUrl }),
          priceCurrency: 'USD',
          price: review.productPrice.toFixed(2),
          availability: 'https://schema.org/InStock',
          ...(amazonUrl && {
            seller: {
              '@type': 'Organization',
              name: 'Amazon',
            },
          }),
        },
      }),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
        ratingCount: '1',
      },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: review.author.name,
      ...(review.author.slug && {
        url: `${siteUrl}/author/${review.author.slug}`,
      }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Outdoor Grill Center',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`, // Update with actual logo path
      },
    },
    datePublished: review.publishedAt || review.createdAt,
    ...(review.updatedAt && review.updatedAt !== review.createdAt && {
      dateModified: review.updatedAt,
    }),
    reviewBody: extractPlainText(review.body) || review.excerpt || '',
  };

  // Add positive notes (pros)
  if (review.prosAndCons?.pros && review.prosAndCons.pros.length > 0) {
    schema.positiveNotes = {
      '@type': 'ItemList',
      itemListElement: review.prosAndCons.pros.map((pro, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: pro.item,
      })),
    };
  }

  // Add negative notes (cons)
  if (review.prosAndCons?.cons && review.prosAndCons.cons.length > 0) {
    schema.negativeNotes = {
      '@type': 'ItemList',
      itemListElement: review.prosAndCons.cons.map((con, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: con.item,
      })),
    };
  }

  return schema;
}

/**
 * Extract plain text from Lexical/RichText for reviewBody
 * Truncate to reasonable length for schema
 */
function extractPlainText(richText: any): string {
  if (!richText) return '';

  // If it's already a string, return it
  if (typeof richText === 'string') return richText;

  // If it's Lexical JSON, extract text from nodes
  if (richText.root?.children) {
    const text = extractTextFromLexical(richText.root.children);
    // Truncate to 5000 characters for schema (Google limit)
    return text.length > 5000 ? text.substring(0, 4997) + '...' : text;
  }

  return '';
}

/**
 * Recursively extract text from Lexical nodes
 */
function extractTextFromLexical(nodes: any[]): string {
  let text = '';

  for (const node of nodes) {
    if (node.text) {
      text += node.text + ' ';
    }
    if (node.children) {
      text += extractTextFromLexical(node.children);
    }
  }

  return text.trim();
}
```

---

### 11.7 Additional Schema Types

#### BreadcrumbList Schema

**Purpose**: Display breadcrumb navigation in search results

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://outdoorgrillcenter.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Reviews",
      "item": "https://outdoorgrillcenter.com/reviews"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Gas Grills",
      "item": "https://outdoorgrillcenter.com/reviews/type/gas-grill"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Weber Genesis II E-335 Review",
      "item": "https://outdoorgrillcenter.com/reviews/weber-genesis-ii-e-335-review"
    }
  ]
}
```

**Implementation**:
```typescript
export function generateBreadcrumbSchema(
  review: Review,
  productType?: string
): object {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://outdoorgrillcenter.com';

  const breadcrumbs = [
    { name: 'Home', url: siteUrl },
    { name: 'Reviews', url: `${siteUrl}/reviews` },
  ];

  if (productType) {
    breadcrumbs.push({
      name: formatProductType(productType),
      url: `${siteUrl}/reviews/type/${productType}`,
    });
  }

  breadcrumbs.push({
    name: review.title,
    url: `${siteUrl}/reviews/${review.slug}`,
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
```

#### Organization Schema (Site-wide)

**File**: `src/app/(website)/layout.tsx`

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Outdoor Grill Center",
  "url": "https://outdoorgrillcenter.com",
  "logo": "https://outdoorgrillcenter.com/logo.png",
  "sameAs": [
    "https://www.facebook.com/outdoorgrillcenter",
    "https://twitter.com/outdoorgrillctr",
    "https://www.youtube.com/@outdoorgrillcenter"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "info@outdoorgrillcenter.com"
  }
}
```

#### WebSite Schema (Site-wide)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Outdoor Grill Center",
  "url": "https://outdoorgrillcenter.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://outdoorgrillcenter.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

### 11.8 Validation & Testing

#### Google Rich Results Test
- URL: https://search.google.com/test/rich-results
- Test each review page after implementation
- Ensure no errors or warnings

#### Schema.org Validator
- URL: https://validator.schema.org/
- Validates JSON-LD syntax
- Checks property usage

#### Google Search Console
- Monitor "Enhancements" section
- Track "Review snippets" report
- Fix any errors reported

#### Testing Checklist
- [ ] All required properties present
- [ ] Rating value between 1-5
- [ ] Valid ISO 8601 dates
- [ ] Image URLs are absolute (not relative)
- [ ] Author and publisher info complete
- [ ] Product name and brand specified
- [ ] No duplicate schemas on page
- [ ] JSON-LD syntax valid
- [ ] Test on multiple review pages

---

### 11.9 Common Issues & Solutions

#### Issue 1: Missing Required Fields
**Problem**: Google requires certain fields for rich snippets
**Solution**: Ensure these are always present:
- `reviewRating.ratingValue`
- `itemReviewed.name`
- `author.name`
- `datePublished`

#### Issue 2: Invalid Rating Values
**Problem**: Rating outside 1-5 range
**Solution**: Validate in schema generator:
```typescript
ratingValue: Math.min(5, Math.max(1, review.rating)).toString()
```

#### Issue 3: Relative Image URLs
**Problem**: Schema requires absolute URLs
**Solution**: Always prepend site URL:
```typescript
image: `${siteUrl}${imageUrl}`
```

#### Issue 4: Multiple Schemas Conflict
**Problem**: Multiple Review schemas on same page
**Solution**: Only include one Review schema per page

#### Issue 5: Author Not a Person
**Problem**: Author might be Organization
**Solution**: Check author type:
```typescript
author: {
  '@type': review.author.type === 'person' ? 'Person' : 'Organization',
  name: review.author.name,
}
```

---

### 11.10 Google Rich Results Examples

#### Star Rating in Search Results
```
⭐⭐⭐⭐⭐ Rating: 4.5 · 1 review
Weber Genesis II E-335 Review - Outdoor Grill Center
https://outdoorgrillcenter.com › reviews › weber-genesis-ii-e-335-review
Mar 15, 2024 — The Weber Genesis II E-335 delivers exceptional
performance for backyard grillers who want restaurant-quality results...
```

#### Product Rich Snippet with Price
```
Weber Genesis II E-335 - $599.00
⭐⭐⭐⭐⭐ 4.5 · Reviewed by John Smith
Gas Grill · In stock
The Weber Genesis II E-335 delivers exceptional performance...
```

---

### 11.11 Implementation Phases

#### Phase 1: Basic Review Schema ⭐
**Week**: During Phase 5 (Polish & Optimization)
**Tasks**:
- [ ] Create `reviewSchema.ts` utility
- [ ] Implement `generateReviewSchema()` function
- [ ] Add JSON-LD script to review detail pages
- [ ] Test with Google Rich Results Test

**Deliverables**:
- Review schema on all review pages
- Star ratings eligible for search results

#### Phase 2: Enhanced Schema
**Week**: Phase 5
**Tasks**:
- [ ] Add BreadcrumbList schema
- [ ] Implement pros/cons as positiveNotes/negativeNotes
- [ ] Add Product offers with pricing
- [ ] Include author relationship

**Deliverables**:
- Breadcrumbs in search results
- Complete product information
- Full review metadata

#### Phase 3: Site-wide Schema
**Week**: Phase 5
**Tasks**:
- [ ] Add Organization schema to layout
- [ ] Add WebSite schema with search action
- [ ] Implement Person schema for authors
- [ ] Add aggregate ratings for product categories

**Deliverables**:
- Site-wide structured data
- Enhanced brand presence in search
- Author rich results

---

### 11.12 Monitoring & Maintenance

#### Monthly Tasks
- [ ] Check Google Search Console for schema errors
- [ ] Monitor click-through rates from search
- [ ] Test new reviews with Rich Results Test
- [ ] Update schema generator if Payload fields change

#### Quarterly Tasks
- [ ] Review Schema.org updates for new properties
- [ ] Analyze rich snippet performance
- [ ] A/B test schema variations (if applicable)
- [ ] Update aggregate ratings

#### Annual Tasks
- [ ] Audit all review pages for schema compliance
- [ ] Update Organization/WebSite schema
- [ ] Review competitor schema implementations
- [ ] Plan schema enhancements

---

### 11.13 Advanced Schema Features (Future)

#### HowTo Schema (for guides)
- Step-by-step instructions
- Useful for "How to grill" content

#### VideoObject Schema
- Embed video reviews
- Show video thumbnails in search

#### FAQPage Schema
- Q&A sections in reviews
- FAQ rich results

#### AggregateRating (multiple reviews)
- When multiple reviews exist for same product
- Show "Based on X reviews"

#### ItemList Schema (for review archives)
- List all reviews on category pages
- Carousel results in search

---

### 11.14 Code Examples - Complete Implementation

#### Full Review Page with All Schemas

**File**: `src/app/(website)/reviews/[slug]/page.tsx`

```tsx
import { generateReviewSchema, generateBreadcrumbSchema } from '@/lib/seo/reviewSchema';
import { getReviewBySlug } from '@/lib/payload/client';

export default async function ReviewPage({ params }) {
  const review = await getReviewBySlug(params.slug);
  const reviewSchema = generateReviewSchema(review);
  const breadcrumbSchema = generateBreadcrumbSchema(review, review.productType);

  return (
    <>
      {/* Review Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page Content */}
      <Container>
        <ReviewHero review={review} />
        <ReviewQuickInfo review={review} />
        <ProsConsList pros={review.prosAndCons?.pros} cons={review.prosAndCons?.cons} />
        <RichText value={review.body} />
        <ProductSpecs review={review} />
        <AuthorCard author={review.author} />
      </Container>
    </>
  );
}
```

---

## Summary: Schema.org Implementation

### Key Benefits
1. ⭐ **Star ratings in Google search results**
2. 📈 **Improved click-through rates (10-30% increase)**
3. 🔍 **Better search visibility for product reviews**
4. 🤖 **Voice search compatibility**
5. 💡 **Rich snippets with pricing, ratings, and author info**

### Implementation Priority
- **High Priority**: Review schema with rating (Phase 5, Week 1)
- **Medium Priority**: Breadcrumb schema (Phase 5, Week 2)
- **Low Priority**: Site-wide schemas (Phase 5, Week 3-4)

### Success Metrics
- [ ] Rich snippets appear in search results (within 2-4 weeks)
- [ ] No errors in Google Search Console
- [ ] 100% of review pages have valid schema
- [ ] Click-through rate improvement from search

---

## Appendix A: Component File Structure

```
src/
├── components/
│   ├── review/
│   │   ├── StarRating.tsx           # Star rating component
│   │   ├── ReviewCard.tsx           # Card for lists/grids
│   │   ├── ReviewHero.tsx           # Detail page hero
│   │   ├── ProsConsList.tsx         # Pros/cons display
│   │   ├── ProductSpecs.tsx         # Specs table
│   │   ├── ReviewQuickInfo.tsx      # Verdict box
│   │   ├── ProductTypeBadge.tsx     # Product type label
│   │   ├── AmazonCTA.tsx            # Amazon button
│   │   └── ReviewFilter.tsx         # Filter/sort controls
│   │
│   ├── seo/
│   │   └── ReviewSchema.tsx         # Schema.org component (optional)
│   │
│   └── blog/                        # Existing components
│       ├── category.js
│       ├── authorCard.js
│       └── pagination.tsx
│
├── app/
│   └── (website)/
│       ├── reviews/
│       │   ├── [slug]/
│       │   │   ├── page.tsx         # Review detail (with schema)
│       │   │   └── default.tsx      # Review component
│       │   ├── type/
│       │   │   └── [productType]/
│       │   │       └── page.tsx     # Filtered by type
│       │   └── page.tsx             # Reviews archive
│       │
│       └── post/                    # Existing post routes
│
└── lib/
    ├── payload/
    │   ├── client.ts                # Data fetching (update)
    │   └── reviewHelpers.ts         # Review-specific utilities (new)
    │
    └── seo/
        └── reviewSchema.ts          # Schema.org generators (NEW)
```

---

## Appendix B: Design Inspiration References

### Review UX Leaders
1. **The Wirecutter (NYT)**
   - Clean, minimal design
   - Prominent pros/cons
   - Clear verdict boxes
   - Affiliate disclosure

2. **CNET Reviews**
   - Spec tables
   - Score breakdown
   - Editor's choice badges
   - Comparison tools

3. **Good Housekeeping**
   - Trust signals (tested by labs)
   - Product images in context
   - Detailed methodology
   - Video embeds

4. **Serious Eats (Equipment Reviews)**
   - In-depth testing notes
   - Multiple product images
   - Comparison charts
   - Runner-up recommendations

### Key Takeaways for OGC
- Be opinionated but fair
- Show testing evidence
- Make CTAs prominent but not aggressive
- Use visual hierarchy to guide reading
- Mobile-first design
- Fast loading essential

---

## Appendix C: Future Enhancements (Post-MVP)

### Phase 2 Features
- [ ] Review comparison tool (side-by-side)
- [ ] Product image galleries (additional photos)
- [ ] Video reviews (YouTube embeds)
- [ ] User comments/questions
- [ ] "Was this review helpful?" voting
- [ ] Email alerts for new reviews in category
- [ ] Print-friendly version
- [ ] Share buttons (social media)
- [ ] Price tracking (historical price data)
- [ ] Stock availability checker

### Advanced Features
- [ ] Interactive product configurator
- [ ] AR view (for size reference)
- [ ] Spec comparison database
- [ ] Expert Q&A section
- [ ] Affiliate link optimization (price comparison)
- [ ] Related recipe/guide content
- [ ] Seasonal buying guides
- [ ] Gift recommendation engine

---

## Summary Checklist

### Phase 1 - Core Components ✅
- [ ] StarRating component (sm, md, lg)
- [ ] ReviewCard component
- [ ] Review detail page (`/reviews/[slug]`)
- [ ] Basic routing setup
- [ ] Display all review fields

### Phase 2 - Product Information ✅
- [ ] ReviewHero component
- [ ] ProductSpecs component
- [ ] Amazon CTA buttons
- [ ] Price display with disclaimer
- [ ] Product type badges

### Phase 3 - Pros/Cons & Content ✅
- [ ] ProsConsList component (2-column layout)
- [ ] ReviewQuickInfo verdict box
- [ ] Enhanced content sections
- [ ] Mobile responsive layouts

### Phase 4 - Filtering & Navigation ✅
- [ ] `/reviews` archive page
- [ ] `/reviews/type/[productType]` routes
- [ ] Filter controls (type, rating)
- [ ] Sort controls (date, rating, price)
- [ ] Breadcrumb navigation
- [ ] Pagination

### Phase 5 - Polish & Optimization ✅
- [ ] Dark mode refinement
- [ ] Accessibility audit (WCAG AA)
- [ ] Performance optimization (Lighthouse > 90)
- [ ] Schema.org markup implementation:
  - [ ] Create `reviewSchema.ts` utility
  - [ ] Add Review schema with Product
  - [ ] Add BreadcrumbList schema
  - [ ] Add positiveNotes/negativeNotes (pros/cons)
  - [ ] Test with Google Rich Results Test
  - [ ] Monitor Google Search Console
- [ ] SEO optimization (rich snippets)
- [ ] Browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS, Android)

---

## Conclusion

This plan provides a comprehensive roadmap for implementing review-specific frontend components that will:

1. **Display all review fields** appropriately and prominently
   - Rating, product info, brand, model, price
   - Pros/cons in structured format
   - Author and metadata
   - Amazon affiliate integration

2. **Maintain visual consistency** with existing site design patterns
   - Tailwind CSS utilities
   - Dark mode support
   - Responsive grid layouts
   - Existing hover effects and animations

3. **Follow industry UX best practices** for review presentation
   - At-a-glance information
   - Prominent ratings and CTAs
   - Clear visual hierarchy
   - Mobile-first design

4. **Support modern web standards** (accessibility, performance, SEO)
   - WCAG AA compliance
   - Lighthouse scores > 90
   - **Schema.org structured data for rich snippets**
   - **Google rich results with star ratings**
   - Semantic HTML

5. **Implement comprehensive Schema.org markup**
   - Review schema with rating
   - Product schema with offers
   - positiveNotes/negativeNotes (pros/cons)
   - BreadcrumbList for navigation
   - Organization and WebSite schemas
   - Expected CTR improvement: 10-30%

6. **Scale gracefully** from mobile to desktop
   - Responsive components
   - Touch-friendly interfaces
   - Fast loading on all devices

7. **Provide clear next steps** for phased implementation
   - 5-phase rollout plan
   - Detailed component specifications
   - Complete code examples
   - Testing checklists

The implementation leverages existing Tailwind patterns, Next.js architecture, and component reusability while introducing review-specific enhancements that align with user expectations for product review content.

**Schema.org integration** will enable star ratings to appear in Google search results, significantly improving visibility and click-through rates. The structured data implementation follows Google's best practices and includes validation tools and monitoring strategies.

**Next Steps**: Begin Phase 1 implementation with StarRating and ReviewCard components.

---

**Document Version**: 2.0 (Updated with Schema.org Implementation)
**Date**: January 2025
**Author**: Claude (Anthropic)
**Project**: Outdoor Grill Center - Review System Redesign
