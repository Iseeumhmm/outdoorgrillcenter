COMPREHENSIVE MIGRATION PLAN: SANITY CMS → PAYLOAD CMS
PART 1: PAYLOAD COLLECTIONS ARCHITECTURE
Collection 1: Posts
Purpose: Main blog post content
Slug: posts Fields Required:
title (text, required)
Type: text
Required: true
Used in: All post displays, page titles, SEO
slug (text, required, unique)
Type: text
Required: true
Unique: true
Used for URL generation
Note: Sanity uses slug.current, Payload uses flat slug
mainImage (upload relationship, required)
Type: upload
Relationship to: media collection
Required: true
Used in: PostList, Featured, single post page
Note: Will need to handle alt text from related Media document
excerpt (textarea, optional)
Type: textarea
Optional field
Used in: PostList component (currently hidden but exists in code)
Max length: 200-300 characters recommended
body (rich text, required)
Type: richText
Editor: Lexical (already configured in payload.config.ts)
Required: true
Used in: Single post page via PortableText component
Note: Need to create Lexical → React component renderer (replacing Sanity's PortableText)
author (relationship, required)
Type: relationship
Relationship to: authors collection
Required: true
Used in: All post displays for author info
categories (relationship, array, optional)
Type: relationship
Relationship to: categories collection
Has many: true (array)
Used in: CategoryLabel component, post filtering
publishedAt (date, optional)
Type: date
Admin: { date: { displayFormat: 'MMMM dd, yyyy' } }
Used for display date
Falls back to createdAt if not set
estReadingTime (number, optional)
Type: number
Optional (defaults to 5 if not present)
Used in: Post metadata displays
featured (checkbox, optional)
Type: checkbox
Used to mark posts for homepage hero/featured display
Default: false
Timestamps (automatic):
createdAt - Used as fallback for publishedAt
updatedAt - For cache management
Collection 2: Authors
Purpose: Blog post authors and their information
Slug: authors Fields Required:
name (text, required)
Type: text
Required: true
Used in: All author displays, about page
Admin: { useAsTitle: true }
slug (text, required, unique)
Type: text
Required: true
Unique: true
Used for: /author/[slug] routes
Note: Sanity uses slug.current, Payload uses flat slug
image (upload relationship, required)
Type: upload
Relationship to: media collection
Required: true
Used in: Author avatars, author cards, about page
bio (rich text, optional)
Type: richText
Editor: Lexical
Used in: AuthorCard component on post pages
Note: Need to replace PortableText with Lexical renderer
email (email, optional)
Type: email
Optional
For contact/social purposes
Note: Currently referenced in:
About page (shows first 3 authors)
Author links on posts
AuthorCard component on single post pages
Author archive pages (route exists: /author/[slug])
Collection 3: Categories
Purpose: Post categorization and filtering
Slug: categories Fields Required:
title (text, required)
Type: text
Required: true
Admin: { useAsTitle: true }
Used in: Category labels, category pages
slug (text, required, unique)
Type: text
Required: true
Unique: true
Used for: /category/[slug] routes
Note: Sanity uses slug.current, Payload uses flat slug
color (select, required)
Type: select
Options: ['green', 'blue', 'orange', 'purple', 'pink']
Required: true
Default: 'blue'
Used in: Label component for color-coding categories
description (textarea, optional)
Type: textarea
Optional
For category archive pages
Virtual/Computed Fields Needed:
count - Number of posts in this category (computed at query time)
Used in: Sidebar categories list
Note: Referenced in:
CategoryLabel component (uses color)
Sidebar component (shows categories with post count)
Category archive pages (route exists: /category/[slug])
Collection 4: Settings (Global)
Purpose: Site-wide configuration
Type: globals (not a collection) Slug: settings Fields Required:
title (text, required)
Type: text
Required: true
Default: "Stablo - Blog Template"
Used in: Page metadata, SEO
description (textarea, required)
Type: textarea
Required: true
Used in: Page metadata, SEO
Max length: 160 characters recommended
url (text, required)
Type: text
Required: true
Format: URL
Used in: Canonical URLs, OpenGraph metadata
logo (upload relationship, required)
Type: upload
Relationship to: media collection
Required: true
Used in: Navbar (light mode)
logoalt (upload relationship, required)
Type: upload
Relationship to: media collection
Required: true
Used in: Navbar (dark mode)
openGraphImage (upload relationship, optional)
Type: upload
Relationship to: media collection
Used in: Social media previews
Note: Currently referenced but not fully implemented
copyright (text, required)
Type: text
Required: true
Default: "Stablo"
Used in: Footer component
email (email, optional)
Type: email
Used in: Contact page
phone (text, optional)
Type: text
Used in: Contact page
w3ckey (text, required)
Type: text
Required: true
Label: "Web3Forms API Key"
Description: "API key for contact form submissions"
Used in: Contact form component
Note: This should be a Global config in Payload, not a collection, because there's only one settings document needed site-wide.
Collection 5: Media (Already Exists - ENHANCE)
Purpose: Image and file storage
Slug: media Current Fields:
alt (text, required) ✓
Additional Fields Needed:
caption (textarea, optional)
Type: textarea
Used in: Image captions in post body (see default.js:116)
blurDataURL (text, optional, computed)
Type: text
Auto-generated placeholder for image loading
Used in: All image components for blur-up loading effect
Note: May need a hook to generate this on upload
ImageColor (text, optional, computed)
Type: text
Dominant color extracted from image
Used in: Featured component for background color
Note: May need a hook to generate this on upload
Upload Configuration:
Already configured with R2 storage ✓
Crop and focalPoint disabled (Workers limitation) ✓
PART 2: DATA STRUCTURE TRANSFORMATION MAP
Sanity Structure → Payload Structure Changes
Slug Fields:
Sanity: slug: { current: "my-post-slug" }
Payload: slug: "my-post-slug"
Impact: ALL components referencing post.slug.current need to change to post.slug
Affected files: 14 files (all component and page files using slugs)
Image References:
Sanity: Direct image object with Sanity-specific metadata
Payload: Relationship to Media collection
Sanity urlForImage(): Transforms Sanity image object to URL
Payload equivalent: Need custom function to handle Payload upload field
Impact: Need to replace urlForImage() function entirely
Rich Text / Body Content:
Sanity: Portable Text format (block-based)
Payload: Lexical editor format (JSON-based)
Sanity PortableText component: Renders Sanity's block content
Payload equivalent: Need custom Lexical → React renderer
Impact: 2 files (default.js, authorCard.js)
Author Nested Data:
Sanity: Author object nested directly in post queries
Payload: Relationship reference (may need populate to get full object)
Impact: May need to adjust queries to populate author data
Categories Array:
Sanity: Array of category objects
Payload: Array of relationship IDs (may need populate)
Impact: May need to adjust queries to populate category data
PART 3: CODE REFACTORING PLAN
Phase 1: Create Payload Collections
Step 1.1: Create Categories Collection
File: /src/collections/Categories.ts
Define all fields as specified above
Add slug auto-generation hook from title
Add validation for color field
Step 1.2: Create Authors Collection
File: /src/collections/Authors.ts
Define all fields as specified above
Add slug auto-generation hook from name
Add image requirement validation
Step 1.3: Create Posts Collection
File: /src/collections/Posts.ts
Define all fields as specified above
Add relationships to Authors, Categories, Media
Add slug auto-generation hook from title
Add reading time calculation hook (estimate from body content length)
Add publishedAt default to current date
Step 1.4: Create Settings Global
File: /src/globals/Settings.ts
Define all fields as specified above
Set as global (single document)
Step 1.5: Enhance Media Collection
File: /src/collections/Media.ts (already exists)
Add caption field
Add beforeChange hook to generate blurDataURL
Add beforeChange hook to extract dominant ImageColor
Research: Use plaiceholder library for blur data URL generation
Research: Use node-vibrant or similar for color extraction
Step 1.6: Update Payload Config
File: /src/payload.config.ts
Import and add all new collections: [Users, Media, Posts, Authors, Categories]
Import and add Settings global
Verify R2 storage configuration includes all upload collections
Phase 2: Create Data Access Layer
Step 2.1: Create Payload Client Utility
File: /src/lib/payload/client.ts
Purpose: Replace /src/lib/sanity/client.ts
Initialize Payload instance for data fetching
Implement caching strategy (Next.js 15 cache)
Step 2.2: Implement Query Functions Function: getAllPosts()
Return all published posts
Populate: author (full object), categories (full objects), mainImage (full object)
Sort: publishedAt DESC, fallback to createdAt DESC
Limit: 100 (configurable)
Map response to match component expectations
Function: getPaginatedPosts(params: { pageIndex, limit })
Return posts with offset pagination
Populate: author, categories, mainImage
Use pageIndex as offset, limit as page size
Sort: publishedAt DESC
Function: getPostBySlug(slug: string)
Find single post by slug
Populate: author (with image, bio), categories, mainImage
Include full body content
Calculate reading time if not stored
Function: getAllPostsSlugs()
Return array of objects: { slug: string }
Used for Next.js generateStaticParams
No population needed, just slugs
Function: getAllAuthors()
Return all authors
Populate: image
Sort: name ASC
Include: name, slug, image
Function: getAuthorBySlug(slug: string)
Find single author by slug
Populate: image, bio
Used for author archive pages (not yet implemented but route exists)
Function: getAllCategories()
Return all categories
Include post count for each category
Sort: title ASC
Function: getCategoryBySlug(slug: string)
Find single category by slug
Used for category archive pages (not yet implemented but route exists)
Function: getSettings()
Fetch Settings global
Populate: logo, logoalt, openGraphImage
Cache aggressively (settings change rarely)
Function: getRelatedPosts(postId: string, categories: string[], limit = 3)
Find posts with matching categories
Exclude current post
Populate: mainImage
Used in: Sidebar component (not currently implemented but structure exists)
Step 2.3: Create Image Utility
File: /src/lib/payload/image.ts
Purpose: Replace /src/lib/sanity/image.ts
Function: urlForImage(upload: PayloadUpload | null)
Handle null/undefined gracefully
If upload is populated object: return { src: upload.url, width: upload.width, height: upload.height }
If upload is just ID: fetch from Payload and return URL
Match Sanity's return format for minimal component changes
Handle alt text from upload.alt field
Function: getImageDimensions(upload: PayloadUpload)
Return width and height
Used for Next.js Image optimization
Step 2.4: Create Rich Text Renderer
File: /src/lib/payload/RichTextRenderer.tsx
Purpose: Replace /src/lib/sanity/plugins/portabletext.tsx
Component: <RichText value={lexicalJSON} />
Accept Lexical JSON format
Render to React components
Handle common Lexical node types:
Paragraphs
Headings (h1-h6)
Lists (ordered/unordered)
Links
Bold, italic, underline
Images (if embedded in content)
Blockquotes
Code blocks
Style with Tailwind classes to match current design
Ensure compatibility with prose class from Tailwind Typography
Reference: Use @payloadcms/richtext-lexical serializers or create custom React renderer
Phase 3: Update All Components
Step 3.1: Update Import Statements
Find: @/lib/sanity/client
Replace: @/lib/payload/client
Affected files: 10+ files
Find: @/lib/sanity/image
Replace: @/lib/payload/image
Affected files: 8+ files
Find: @/lib/sanity/plugins/portabletext
Replace: @/lib/payload/RichTextRenderer
Affected files: 2 files (default.js, authorCard.js)
Step 3.2: Update Slug References
Find: post.slug.current OR author.slug.current OR category.slug.current
Replace: post.slug OR author.slug OR category.slug
Affected files: 14+ files
Files to update:
/src/components/postlist.js (lines 45, 88, 109)
/src/components/postalt.js (lines 33, 79)
/src/components/featured.js (lines 27, 47)
/src/components/sidebar.js (line 52)
/src/components/blog/category.js (line 13)
/src/components/blog/authorCard.js (lines 13, 35)
/src/app/(website)/post/[slug]/default.js (lines 45, 58)
/src/app/(website)/about/about.js (line 23)
Step 3.3: Update Rich Text Rendering
File: /src/app/(website)/post/[slug]/default.js (line 95)
Find: <PortableText value={post.body} />
Replace: <RichText value={post.body} />
File: /src/components/blog/authorCard.js (line 31)
Find: <PortableText value={author.bio} />
Replace: <RichText value={author.bio} />
Step 3.4: Update Image Handling
Verify urlForImage() calls work with new Payload function
Test that alt text is properly extracted from Media collection
Ensure blur placeholders are generated and used
Affected components: All components using images (12+ files)
Step 3.5: Update Layout Metadata
File: /src/app/(website)/layout.tsx
Line 5: Currently has empty settings object
Fix: Ensure getSettings() is called and returns proper data
Line 26: Update OpenGraph image URL generation to use new urlForImage()
Phase 4: Create Missing Route Handlers
Step 4.1: Author Archive Page
Route: /src/app/(website)/author/[slug]/page.js
Fetch: Author by slug + all posts by that author
Display: Author info + grid of their posts
Step 4.2: Category Archive Page
Route: /src/app/(website)/category/[slug]/page.js
Fetch: Category by slug + all posts in that category
Display: Category info + grid of posts
Step 4.3: Search Results Page
Route: /src/app/(website)/search/page.js
Query param: ?q=search-term
Implement full-text search in Posts collection
Display: Search results in grid format
Phase 5: Implement Additional Features
Step 5.1: Related Posts Sidebar
File: /src/components/sidebar.js
Currently accepts related prop but not passed from pages
Implement logic to fetch related posts based on categories
Pass to Sidebar component in single post page
Step 5.2: Post Excerpt Generation
If excerpt not provided, auto-generate from first 200 chars of body
Implement as Payload beforeChange hook or query-time computation
Step 5.3: Reading Time Calculation
Calculate based on word count in body
Average reading speed: 200-250 words/minute
Implement as Payload beforeChange hook
Step 5.4: OpenGraph Image Generation
File: /src/app/(website)/post/[slug]/opengraph-image.tsx
Currently named opengraph-todo.js - rename and implement
Fetch post data and generate OG image
Ensure Inter-Bold.otf font is available in /public/fonts/
Phase 6: Data Migration Strategy
Step 6.1: Export Sanity Data (if exists)
If there's existing Sanity data, export via Sanity CLI
Convert to JSON format
Map Sanity document structure to Payload structure
Step 6.2: Prepare Migration Script
Create: /scripts/migrate-sanity-to-payload.ts
Read exported Sanity JSON
Transform data structures:
Flatten slug objects: { current: "x" } → "x"
Convert Portable Text to Lexical JSON
Map image references to Payload upload IDs
Map relationships (author, categories)
Insert into Payload via REST API or direct DB access
Step 6.3: Seed Sample Data
Create: /scripts/seed-payload.ts
Generate sample posts, authors, categories
Useful for development and testing
Should create:
3 authors with images and bios
5 categories with different colors
20+ posts with various combinations
1 settings document with all fields
Phase 7: Testing & Validation
Step 7.1: Component Testing
Test each component renders correctly with Payload data
Verify all image URLs resolve correctly
Verify rich text renders properly
Test responsive layouts
Step 7.2: Route Testing
Test all page routes:
Home: /
About: /about
Contact: /contact
Archive: /archive with pagination
Single post: /post/[slug]
Author archive: /author/[slug] (new)
Category archive: /category/[slug] (new)
Search: /search?q=term (new)
Step 7.3: Data Validation
Verify all Payload collections have correct fields
Test required field validation
Test unique slug validation
Test relationship population
Step 7.4: Performance Testing
Test query performance with 100+ posts
Verify pagination works correctly
Test image optimization and loading
Verify caching strategies
PART 4: DETAILED FILE TRANSFORMATION MATRIX
Files Requiring Heavy Modification:
/src/lib/sanity/client.ts → DELETE, replace with /src/lib/payload/client.ts
Complete rewrite
Change from Sanity queries to Payload queries
9 functions to reimplement
/src/lib/sanity/image.ts → DELETE, replace with /src/lib/payload/image.ts
Complete rewrite
Change from Sanity image URLs to Payload upload URLs
Maintain same function signature for minimal component changes
/src/lib/sanity/plugins/portabletext.tsx → DELETE, replace with /src/lib/payload/RichTextRenderer.tsx
Complete rewrite
Change from Portable Text to Lexical rendering
Maintain same component interface
Files Requiring Medium Modification (Imports + Slug Changes):
/src/app/(website)/page.js
Update import from @/lib/sanity/client
No slug changes needed
/src/app/(website)/home.js
No direct imports, but uses data from page.js
Verify post._id exists (should be auto-generated by Payload)
/src/app/(website)/layout.tsx
Update import
Fix getSettings() call on line 48
Update OpenGraph image handling
/src/app/(website)/about/page.js
Update imports (2 functions)
/src/app/(website)/about/about.js
Update image import
Update slug reference: line 23 (author.slug.current → author.slug)
/src/app/(website)/contact/page.js
Update import
/src/app/(website)/contact/contact.js
No changes (uses settings passed as prop)
/src/app/(website)/archive/page.js
No direct changes
/src/app/(website)/archive/archive.js
Update import
/src/app/(website)/post/[slug]/page.js
Update imports (2 functions)
/src/app/(website)/post/[slug]/default.js
Update imports (2: image, PortableText)
Update slug references: lines 45, 58
Update PortableText to RichText: line 95
/src/app/(website)/post/[slug]/opengraph-todo.js
Rename to opengraph-image.tsx
Update import
Implement fully (currently TODO)
Files Requiring Light Modification (Imports + Slugs):
/src/components/postlist.js
Update image import
Update slug refs: lines 45, 88, 109, 117
/src/components/postalt.js
Update image import
Update slug refs: lines 33, 79
/src/components/featured.js
Update image import
Update slug refs: lines 27, 47
/src/components/sidebar.js
Update image import
Update slug ref: line 52, 91
/src/components/navbar.js
Update image import
No slug changes
/src/components/footer.js
No imports from Sanity
No changes
/src/components/blog/category.js
Update slug ref: line 13
/src/components/blog/authorCard.js
Update imports (2: image, PortableText)
Update slug refs: lines 13, 35
Update PortableText to RichText: line 31
/src/components/blog/pagination.tsx
No changes
Files NOT Requiring Changes:
All UI components: label.js, search.js, time.js, themeSwitch.js, loading.js, container.js
ogimage.js - Only needs updated imports in pages that use it
PART 5: IMPLEMENTATION ORDER & DEPENDENCIES
Critical Path (Must be done in order):
Week 1: Foundation
Day 1-2: Create all Payload collection files (Categories, Authors, Posts)
Day 2-3: Create Settings global
Day 3-4: Enhance Media collection with hooks for blur/color
Day 4-5: Update payload.config.ts and test in Payload admin UI
Week 2: Data Layer 5. Day 1-2: Create /src/lib/payload/client.ts with all query functions 6. Day 2-3: Create /src/lib/payload/image.ts utility 7. Day 3-5: Create /src/lib/payload/RichTextRenderer.tsx component 8. Day 5: Test all utilities in isolation Week 3: Component Updates 9. Day 1: Update all import statements (bulk find/replace) 10. Day 2: Update all slug references (bulk find/replace) 11. Day 3: Update rich text rendering (2 files) 12. Day 4: Update layout metadata handling 13. Day 5: Test all components render correctly Week 4: New Features & Routes 14. Day 1-2: Create author archive page 15. Day 2-3: Create category archive page 16. Day 3-4: Create search page 17. Day 4-5: Implement related posts sidebar Week 5: Polish & Migration 18. Day 1-2: Implement reading time calculation 19. Day 2-3: Implement OpenGraph image generation 20. Day 3-4: Create seed data script 21. Day 4-5: Create Sanity → Payload migration script (if needed) Week 6: Testing 22. Day 1-2: Comprehensive testing all routes 23. Day 2-3: Performance testing & optimization 24. Day 3-4: Fix bugs and edge cases 25. Day 4-5: Final QA and deployment prep
PART 6: POTENTIAL CHALLENGES & SOLUTIONS
Challenge 1: Portable Text → Lexical Conversion
Problem: Sanity's Portable Text is block-based, Lexical is node-based with different JSON structure
Solution 1: Use Payload's built-in Lexical serializers: @payloadcms/richtext-lexical/server
Solution 2: Create custom React renderer that walks Lexical JSON tree
Solution 3: For migration, create converter that transforms Portable Text blocks to Lexical nodes
Recommendation: Use Solution 2 for rendering, Solution 3 for data migration
Challenge 2: Image Blur Data URL Generation
Problem: Need to generate blur placeholders on upload, but Workers environment has limitations
Solution 1: Use plaiceholder library (may not work on Workers)
Solution 2: Use Cloudflare's Image Resizing API to generate tiny preview
Solution 3: Generate blur data URLs in build-time for static posts
Solution 4: Skip blur placeholders (degraded UX but functional)
Recommendation: Try Solution 2, fall back to Solution 4
Challenge 3: Dominant Color Extraction
Problem: Need to extract dominant color for Featured component background
Solution 1: Use node-vibrant library (may not work on Workers)
Solution 2: Use Cloudflare's Image Resizing API + simple color analysis
Solution 3: Let users manually select color in admin UI (best UX)
Recommendation: Solution 3 - add color picker field to Posts collection
Challenge 4: Relationship Population Performance
Problem: Populating author + categories + images on every post adds query overhead
Solution 1: Use Payload's depth parameter carefully (depth: 1 for most queries)
Solution 2: Implement aggressive caching with Next.js 15 cache tags
Solution 3: For list views, only populate necessary fields (not full objects)
Recommendation: Combination of all three
Challenge 5: Slug Format Consistency
Problem: Many components deeply rely on slug.current pattern
Solution 1: Bulk find/replace all instances (error-prone)
Solution 2: Create helper function that wraps slugs in object: { current: slug }
Solution 3: Update all components one by one
Recommendation: Solution 1 with thorough testing
Challenge 6: Category Post Count
Problem: Sidebar needs category count, but it's not stored in Categories collection
Solution 1: Compute on every query (expensive)
Solution 2: Add postCount field updated via Post hooks (eventual consistency)
Solution 3: Compute at build time for static site
Recommendation: Solution 2 - add afterChange hook to Posts that updates category counts
Challenge 7: Static Site Generation
Problem: Need getAllPostsSlugs() to return all slugs for static generation
Solution: Simple query returning only slug field, no population needed
Performance: Should be fast even with 1000+ posts
Challenge 8: Search Implementation
Problem: No search currently implemented, but UI exists
Solution 1: Use Payload's built-in search (limited)
Solution 2: Implement Cloudflare's D1 full-text search
Solution 3: Use external service like Algolia (overkill)
Recommendation: Solution 2 - D1 supports FTS5
PART 7: ROLLBACK PLAN
If Migration Fails:
Keep Sanity files in /src/lib/sanity-backup/ during migration
Use feature flags to toggle between Sanity and Payload data sources
Implement adapter pattern so components work with either CMS
Test thoroughly in staging before production deployment
Keep Sanity instance running until Payload is proven stable
SUMMARY: WHAT NEEDS TO BE CREATED
New Payload Collections (5):
/src/collections/Posts.ts
/src/collections/Authors.ts
/src/collections/Categories.ts
/src/globals/Settings.ts
/src/collections/Media.ts (enhance existing)
New Utility Libraries (3):
/src/lib/payload/client.ts (9 functions)
/src/lib/payload/image.ts (2 functions)
/src/lib/payload/RichTextRenderer.tsx (1 component)
New Route Pages (3):
/src/app/(website)/author/[slug]/page.js
/src/app/(website)/category/[slug]/page.js
/src/app/(website)/search/page.js
New Utility Scripts (2):
/scripts/seed-payload.ts
/scripts/migrate-sanity-to-payload.ts (if migrating existing data)
Files to Modify (24 files):
15 page/component files: Update imports + slug references
3 lib files: Complete replacement
5 route files: Update imports
1 config file: Add new collections
Files to Delete (3):
/src/lib/sanity/client.ts
/src/lib/sanity/image.ts
/src/lib/sanity/plugins/portabletext.tsx
FINAL NOTES:
Critical Dependencies: Lexical rendering, image URL generation, relationship population
Biggest Risk: Portable Text → Lexical conversion complexity
Biggest Benefit: Native TypeScript types, better Next.js integration, single codebase
Testing Priority: Rich text rendering, image loading, relationship queries, pagination
This plan provides microscopic detail on every collection field, every function needed, every file to modify, and the exact order of operations. The migration is complex but systematic - following this plan step-by-step will ensure a successful transition from Sanity to Payload CMS.