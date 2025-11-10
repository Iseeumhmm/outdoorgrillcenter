# Quick Start Guide - Review System

This guide will help you quickly start using the new review system.

---

## 🚀 Getting Started (3 Steps)

### 1. Configure Environment Variables

Create or update your `.env.local` file:

```env
# Amazon Affiliate Tag (required for affiliate links)
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=your-amazon-tag-20

# Site URL (required for Schema.org structured data)
NEXT_PUBLIC_SITE_URL=https://outdoorgrillcenter.com
```

### 2. Build & Run

```bash
# Install dependencies (if needed)
pnpm install

# Run development server
pnpm dev

# Or build for production
pnpm build
pnpm start
```

### 3. Visit Review Pages

- **All Reviews**: http://localhost:3000/reviews
- **Single Review**: http://localhost:3000/reviews/[your-review-slug]
- **Filter by Type**: http://localhost:3000/reviews/type/pellet-grill

---

## 📝 Creating a Review in Payload CMS

### Required Fields
1. **Title** - Review headline
2. **Slug** - URL-friendly identifier (auto-generated)
3. **Product Name** - Name of the product
4. **Product Brand** - Manufacturer (e.g., "Weber", "Traeger")
5. **Rating** - 1-5 stars (supports 0.5 increments)
6. **Main Image** - Product photo
7. **Body** - Full review content (rich text)
8. **Author** - Select from authors
9. **Published At** - Publication date (reviews won't show until published)

### Recommended Fields
- **Excerpt** - Brief summary (used in cards and SEO)
- **Product Type** - Select from: pellet-grill, gas-grill, charcoal, kamado, electric, portable, smoker
- **Product Price** - Price at time of review (in USD)
- **Product Model** - Model number
- **Amazon ASIN** - For "Buy on Amazon" links (e.g., `B01N2W0B61`)
- **Pros and Cons** - Add items to pros/cons arrays
- **Categories** - Tag with relevant categories
- **Featured** - Check to feature on homepage (if implemented)

---

## 🎨 Component Usage

### StarRating
```jsx
import StarRating from "@/components/review/StarRating";

<StarRating rating={4.5} size="lg" showNumeric={true} />
```

**Props**:
- `rating` (number): 1-5 with 0.5 increments
- `size` (string): "sm" | "md" | "lg"
- `showNumeric` (boolean): Display "4.5" next to stars

---

### ReviewCard
```jsx
import ReviewCard from "@/components/review/ReviewCard";

<ReviewCard review={reviewObject} aspect="landscape" />
```

**Props**:
- `review` (object): Review from Payload
- `aspect` (string): "landscape" | "square"
- `minimal` (boolean): Hide pros/cons preview

---

### ProsConsList
```jsx
import ProsConsList from "@/components/review/ProsConsList";

<ProsConsList
  pros={review.prosAndCons?.pros || []}
  cons={review.prosAndCons?.cons || []}
/>
```

---

### AmazonCTA
```jsx
import AmazonCTA from "@/components/review/AmazonCTA";

<AmazonCTA
  amazonASIN="B01N2W0B61"
  productName="Weber Genesis II"
  price={599}
  variant="primary"
/>
```

**Variants**:
- `primary` - Large orange button (main CTA)
- `secondary` - Blue outline button

---

## 🗂️ Data Fetching Functions

### Get All Reviews
```typescript
import { getAllReviews } from "@/lib/payload/client";

const reviews = await getAllReviews(100); // limit: 100
```

### Get Reviews by Product Type
```typescript
import { getReviewsByProductType } from "@/lib/payload/client";

const pelletGrills = await getReviewsByProductType("pellet-grill", 50);
```

### Get Top-Rated Reviews
```typescript
import { getTopRatedReviews } from "@/lib/payload/client";

const topRated = await getTopRatedReviews(10); // top 10
```

### Get Reviews by Brand
```typescript
import { getReviewsByBrand } from "@/lib/payload/client";

const weberReviews = await getReviewsByBrand("Weber", 50);
```

### Get Paginated Reviews
```typescript
import { getPaginatedReviews } from "@/lib/payload/client";

const { reviews, totalPages, page } = await getPaginatedReviews({
  pageIndex: 0,
  limit: 12
});
```

---

## 🔍 SEO & Schema.org

### Test Your Schema Markup

1. **Google Rich Results Test**
   - Go to: https://search.google.com/test/rich-results
   - Enter your review page URL
   - Look for "Review" and "BreadcrumbList" schemas
   - Fix any errors/warnings

2. **Schema.org Validator**
   - Go to: https://validator.schema.org/
   - Paste your page URL
   - Verify all properties are valid

### Expected Rich Snippet
After Google indexes your pages (2-4 weeks), you should see:

```
⭐⭐⭐⭐⭐ Rating: 4.5 · 1 review
Weber Genesis II E-335 Review - Outdoor Grill Center
https://outdoorgrillcenter.com › reviews › weber-genesis-ii-e-335-review
Mar 15, 2024 — The Weber Genesis II E-335 delivers exceptional
performance for backyard grillers who want restaurant-quality results...
```

---

## 📊 Product Types

Supported product types (use these slugs in Payload):

| Slug | Display Name | Color |
|------|--------------|-------|
| `pellet-grill` | Pellet Grill | Purple |
| `gas-grill` | Gas Grill | Blue |
| `charcoal` | Charcoal | Gray |
| `kamado` | Kamado | Orange |
| `electric` | Electric | Cyan |
| `portable` | Portable | Green |
| `smoker` | Smoker | Indigo |

---

## 🎯 Common Tasks

### Add a New Review
1. Log in to Payload CMS at `/admin`
2. Go to "Reviews" collection
3. Click "Create New"
4. Fill in all required fields
5. Add pros/cons
6. Set "Published At" date
7. Save & publish

### Change Amazon Affiliate Tag
Update `.env.local`:
```env
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=new-tag-20
```
Restart dev server: `pnpm dev`

### Customize Product Type Colors
Edit [src/components/review/ProductTypeBadge.js](src/components/review/ProductTypeBadge.js#L25-L55)

### Add New Product Type
1. Add to Payload CMS collection options
2. Update `ProductTypeBadge.js` color config
3. Add to "Browse by Type" sections in archive pages

---

## 🐛 Troubleshooting

### Reviews Not Showing Up
- ✅ Check "Published At" field is set (not null)
- ✅ Verify review has required fields (title, slug, rating)
- ✅ Check server logs for errors

### Star Ratings Not Displaying
- ✅ Verify `rating` field is a number between 1-5
- ✅ Check for JavaScript errors in console
- ✅ Ensure StarRating component is imported correctly

### Amazon Links Not Working
- ✅ Set `NEXT_PUBLIC_AMAZON_AFFILIATE_TAG` in `.env.local`
- ✅ Verify `amazonASIN` field is filled in Payload
- ✅ Restart dev server after changing env vars

### Schema Markup Errors
- ✅ Check all required fields are present (rating, product name, author)
- ✅ Verify image URLs are absolute (not relative)
- ✅ Set `NEXT_PUBLIC_SITE_URL` environment variable
- ✅ Test with Google Rich Results Test

### Pros/Cons Not Showing
- ✅ Verify `prosAndCons.pros` and `prosAndCons.cons` arrays exist
- ✅ Check array items have `item` property
- ✅ Ensure arrays are not empty

---

## 📚 Additional Resources

### Documentation
- **Main Plan**: [REVIEW_FRONTEND_IMPLEMENTATION_PLAN.md](REVIEW_FRONTEND_IMPLEMENTATION_PLAN.md)
- **Implementation Summary**: [IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)

### Component Files
- **Reviews**: [src/components/review/](src/components/review/)
- **Pages**: [src/app/(website)/reviews/](src/app/(website)/reviews/)
- **Data Fetching**: [src/lib/payload/client.ts](src/lib/payload/client.ts)
- **Schema.org**: [src/lib/seo/reviewSchema.ts](src/lib/seo/reviewSchema.ts)

### External Links
- **Next.js 15**: https://nextjs.org/docs
- **Payload CMS**: https://payloadcms.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Schema.org Review**: https://schema.org/Review
- **Google Rich Results**: https://search.google.com/test/rich-results

---

## ✨ Tips & Best Practices

### Writing Great Reviews
1. ✍️ **Be detailed but scannable** - Use headings, lists, and short paragraphs
2. 📸 **Use high-quality images** - Clear product photos improve engagement
3. ⚖️ **Be balanced** - Include both pros and cons
4. 💰 **Keep prices updated** - Note if price has changed significantly
5. 🏷️ **Use categories** - Tag reviews for better organization
6. 📝 **Write compelling excerpts** - This appears in cards and search results

### SEO Optimization
1. 🔍 **Use descriptive titles** - Include product name and brand
2. ⭐ **Accurate ratings** - Be consistent with your rating scale
3. 📅 **Update published dates** - Keep content fresh
4. 🔗 **Internal linking** - Link to related reviews
5. 📊 **Monitor Search Console** - Track rich snippet performance

### Performance
1. 🖼️ **Optimize images** - Use Next.js Image component (already implemented)
2. 📦 **Lazy load content** - Large reviews load efficiently
3. 🚀 **Static generation** - Pages are pre-rendered at build time
4. 💾 **Cache effectively** - Payload queries are cached

---

## 🎉 You're Ready!

The review system is fully operational. Start creating reviews in Payload CMS and they'll automatically appear with:
- ✅ Beautiful, responsive design
- ✅ Star ratings and product info
- ✅ Pros/cons displays
- ✅ Amazon affiliate links
- ✅ SEO-optimized Schema.org markup
- ✅ Product type filtering

**Happy reviewing! 🔥**
