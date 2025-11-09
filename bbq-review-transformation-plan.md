# BBQ Review System Transformation - LLM Implementation Instructions

## Overview
Transform the current blog seeding system into an outdoor BBQ/smoker review platform with real product data, featuring actual product images and review ratings.

---

## Phase 1: Database Schema Updates

### 1.1 Rename Posts to Reviews Collection
**Target File:** Rename `src/collections/Posts.ts` to `src/collections/Reviews.ts`

**Required Changes:**
1. Rename the file from `Posts.ts` to `Reviews.ts`
2. Update the collection slug from `'posts'` to `'reviews'`
3. Update the export name from `Posts` to `Reviews`
4. Update `src/payload.config.ts` to import and use `Reviews` instead of `Posts`

### 1.2 Update Reviews Collection Schema
**Target File:** `src/collections/Reviews.ts`

**Required Schema Changes:**
Add the following fields to the Reviews collection:
- `rating` field (number, 1-5 scale with 0.5 increments, required)
- `productName` field (text, required) - Full product name
- `productBrand` field (text, required) - Brand (Weber, Traeger, Pit Boss, etc.)
- `productModel` field (text) - Model number/identifier
- `amazonASIN` field (text) - Amazon Standard Identification Number (when available)
- `productPrice` field (number) - Price at time of review in USD/CAD
- `productType` field (select) - Options: 'pellet-grill', 'gas-grill', 'charcoal-grill', 'kamado', 'electric-smoker', 'portable'
- `prosAndCons` field (group) containing:
  - `pros` (array of text items)
  - `cons` (array of text items)
- Update admin.defaultColumns to show: ['title', 'rating', 'productBrand', 'publishedAt']
- Update admin.useAsTitle to 'title' (if not already set)

---

## Phase 2: Update Categories

### 2.1 Update Categories Collection
**Target File:** `src/collections/Categories.ts`

**Required Categories (6 total):**
1. **Pellet Grills** (color: orange) - "Wood-fired pellet grills and smokers"
2. **Gas Grills** (color: blue) - "Propane and natural gas grills"
3. **Charcoal Grills** (color: green) - "Traditional charcoal and BBQ grills"
4. **Kamado Grills** (color: purple) - "Ceramic kamado-style grills"
5. **Electric Smokers** (color: pink) - "Electric smokers and vertical smokers"
6. **Portable Grills** (color: orange) - "Compact and portable grilling solutions"

---

## Phase 3: Update Authors

### 3.1 Create Single BBQ Expert Author
**Target File:** Update seed data in `scripts/seed-payload.ts`

**Required Author (1 total):**
**Jake "The Grillmaster" Thompson**
- Name: "Jake Thompson"
- Slug: "jake-thompson"
- Bio: "Professional pitmaster with 15+ years of competition BBQ experience. Winner of multiple state championships and passionate about helping home cooks achieve restaurant-quality results. Tests over 50 grills and smokers annually to provide honest, in-depth reviews for the outdoor cooking community."
- Email: jake@outdoorgrillcenter.com
- Image: Source a professional BBQ expert portrait from Unsplash or similar (search: "professional chef portrait" or "bbq chef")

---

## Phase 4: Product Research & Data Collection

### 4.1 Required Product Reviews
Create comprehensive reviews for the following 9 products:

#### Pellet Grills (3 products)
1. **Traeger Ironwood 885**
   - Rating: 4.5/5
   - Price: $1,999 USD
   - Product Type: pellet-grill
   - Key Features: WiFIRE technology, 885 sq in cooking space, pellet sensor, TurboTemp, Super Smoke mode
   - Amazon ASIN: B07MQKZ4N5
   - Category: Pellet Grills

2. **Pit Boss Sportsman 820**
   - Rating: 4/5
   - Price: $899 USD
   - Product Type: pellet-grill
   - Key Features: 820 sq in cooking area, flame broiler lever, porcelain-coated grates, digital control board
   - Amazon ASIN: B08GC4QRP8
   - Category: Pellet Grills

3. **Z Grills Wood Pellet Grill 700D**
   - Rating: 4.5/5
   - Price: $599 USD
   - Product Type: pellet-grill
   - Key Features: 8-in-1 versatility, 700 sq in cooking space, PID controller, automatic auger
   - Amazon ASIN: B07PPNQMHH
   - Category: Pellet Grills

#### Kamado Grills (2 products)
4. **Kamado Joe Classic III**
   - Rating: 5/5
   - Price: $1,699 USD
   - Product Type: kamado
   - Key Features: 18" cooking surface, Divide & Conquer flexible cooking system, Air Lift hinge, SlōRoller hyperbolic insert
   - Amazon ASIN: B07RBYQMGS
   - Category: Kamado Grills

5. **Big Green Egg Large**
   - Rating: 4.5/5
   - Price: $1,299 USD
   - Product Type: kamado
   - Key Features: 18.25" ceramic cooking grid, temperature range 150-750°F, lifetime warranty, 262 sq in cooking area
   - ASIN: (Available through authorized dealers)
   - Category: Kamado Grills

#### Gas Grills (2 products)
6. **Weber Spirit II E-310**
   - Rating: 4.5/5
   - Price: $649 USD
   - Product Type: gas-grill
   - Key Features: 3-burner, 529 sq in total cooking space, porcelain-enameled cast-iron grates, GS4 grilling system
   - Amazon ASIN: B01N79WW3R
   - Category: Gas Grills

7. **Char-Broil Performance 4-Burner**
   - Rating: 4/5
   - Price: $399 USD
   - Product Type: gas-grill
   - Key Features: 4-burner, 475 sq in primary cooking space, stainless steel burners, side burner included
   - Amazon ASIN: B085QDVLXD
   - Category: Gas Grills

#### Electric Smokers (1 product)
8. **Masterbuilt Digital Electric Smoker**
   - Rating: 4/5
   - Price: $349 USD
   - Product Type: electric-smoker
   - Key Features: 30" vertical design, digital controls, 710 sq in cooking space, side wood chip loading
   - Amazon ASIN: B074W4B82D
   - Category: Electric Smokers

#### Portable Grills (1 product)
9. **Pit Boss PB150PPG Portable Tabletop Pellet Grill**
   - Rating: 4/5
   - Price: $399 CAD
   - Product Type: portable
   - Key Features: 256 sq in cooking space, 180-500°F temp range, Flame Broiler, 8-in-1 versatility, digital LED controls
   - Source: Canadian Tire
   - Model: PB150PPG
   - Category: Portable Grills
   - Additional: Lock-tight latches, 43.4 lb weight, 5-year warranty

---

## Phase 5: Image Collection

### 5.1 Product Image Requirements
For each of the 9 products, source ONE main product image:
- High-resolution product photo (1200x800 minimum)
- Professional product photography preferred
- Clear view of entire grill/smoker

**Image Sources (in order of preference):**
1. Official manufacturer product pages (Traeger.com, PitBoss-Grills.com, Weber.com, KamadoJoe.com, BigGreenEgg.com, Z-Grills.com, Char-Broil.com, Masterbuilt.com)
2. Canadian Tire website (for PB150PPG)
3. Amazon product pages
4. High-quality stock photos from Unsplash (search specific model numbers)

**Image Processing:**
- Download each image via fetch/download in the seed script
- Store as temporary files during seeding process
- Upload directly to R2 via Payload's file upload system
- No need for local storage persistence

**File Naming Convention:**
- traeger-ironwood-885.jpg
- pit-boss-sportsman-820.jpg
- z-grills-700d.jpg
- kamado-joe-classic-iii.jpg
- big-green-egg-large.jpg
- weber-spirit-ii-e310.jpg
- char-broil-performance-4burner.jpg
- masterbuilt-digital-electric.jpg
- pit-boss-pb150ppg.jpg

---

## Phase 6: Create Review Content

### 6.1 Review Content Structure
For each of the 9 products, create a comprehensive review using Lexical rich text format.

**Required Review Structure (Lexical JSON format):**
1. **Introduction** (2-3 paragraphs)
   - Hook: What makes this grill notable
   - Overview: Who it's for, price positioning
   - Testing context: How you evaluated it

2. **Key Specifications** (bullet list using Lexical list nodes)
   - Cooking area (sq in)
   - Temperature range
   - BTU/power output
   - Dimensions and weight
   - Warranty

3. **Build Quality & Design** (2-3 paragraphs)
   - Materials and construction
   - Design aesthetic
   - Durability assessment

4. **Performance & Cooking Tests** (3-4 paragraphs)
   - Heat-up time
   - Cooking results (specific foods tested)
   - Smoke production (for smokers/pellet grills)
   - Searing capability

5. **Temperature Control** (2 paragraphs)
   - Consistency and accuracy
   - Control system evaluation
   - Heat distribution

6. **Ease of Use** (2 paragraphs)
   - Assembly requirements
   - Learning curve
   - Day-to-day operation

7. **Cleaning & Maintenance** (1-2 paragraphs)
   - Grease management
   - Ash removal
   - Component accessibility

8. **Final Verdict** (2 paragraphs)
   - Overall assessment
   - Who should buy it
   - Who should skip it

**Pros & Cons Lists:**
Each review must include in the `prosAndCons` field:
- **Pros:** 4-6 specific positive points
- **Cons:** 3-5 specific negative points or limitations

**Content Requirements:**
- Word count: 1,200-1,800 words per review
- Tone: Expert but accessible, honest and balanced
- Style: Direct, specific, avoiding vague language
- Include actual numbers (temperatures, times, prices)
- Reference specific cooking scenarios
- Base content on real product specifications and common user feedback

---

## Phase 7: Update Seeding Script

### 7.1 Add Database Clearing Functionality
**Target File:** `scripts/seed-payload.ts`

**Required: Implement complete data clearing before seeding**

Create an async function `clearAllData(payload)` that performs the following operations:

```typescript
async function clearAllData(payload: any) {
  console.log('🗑️  Clearing all existing data...')

  // 1. Delete all reviews
  const reviews = await payload.find({ collection: 'reviews', limit: 1000 })
  for (const review of reviews.docs) {
    await payload.delete({ collection: 'reviews', id: review.id })
  }

  // 2. Delete all authors
  const authors = await payload.find({ collection: 'authors', limit: 1000 })
  for (const author of authors.docs) {
    await payload.delete({ collection: 'authors', id: author.id })
  }

  // 3. Delete all categories
  const categories = await payload.find({ collection: 'categories', limit: 1000 })
  for (const category of categories.docs) {
    await payload.delete({ collection: 'categories', id: category.id })
  }

  // 4. Delete all media (this also removes files from R2)
  const media = await payload.find({ collection: 'media', limit: 1000 })
  for (const mediaItem of media.docs) {
    await payload.delete({ collection: 'media', id: mediaItem.id })
  }

  console.log('✅ All data cleared successfully')
}
```

**Important:** Call this function at the start of the seed process, removing the existing check that prevents seeding when data exists.

### 7.2 Update Image URLs
Replace the `PLACEHOLDER_IMAGES` constant with actual product image URLs:

**Required Image URLs:**
```typescript
const PRODUCT_IMAGES = {
  author: 'URL_FOR_BBQ_EXPERT_PORTRAIT', // Find on Unsplash
  products: [
    'URL_FOR_TRAEGER_IRONWOOD_885',
    'URL_FOR_PIT_BOSS_SPORTSMAN_820',
    'URL_FOR_Z_GRILLS_700D',
    'URL_FOR_KAMADO_JOE_CLASSIC_III',
    'URL_FOR_BIG_GREEN_EGG_LARGE',
    'URL_FOR_WEBER_SPIRIT_II_E310',
    'URL_FOR_CHAR_BROIL_PERFORMANCE',
    'URL_FOR_MASTERBUILT_ELECTRIC',
    'URL_FOR_PIT_BOSS_PB150PPG',
  ],
  logo: 'URL_FOR_SITE_LOGO', // BBQ/grill themed logo
}
```

**Instructions for sourcing:**
- Search manufacturer websites for high-res product images
- Use Unsplash for author portrait: "professional chef portrait" or "bbq pitmaster"
- Use Unsplash for logo: "grill logo" or "bbq restaurant logo"
- Ensure all images are 1200px+ width for quality

### 7.3 Replace Sample Data Constants
**Target:** Replace all `SAMPLE_*` constants in the seed file

**Required Constants:**

```typescript
// Single author
const SAMPLE_BBQ_AUTHOR = {
  name: 'Jake Thompson',
  slug: 'jake-thompson',
  bio: { /* Lexical JSON from Phase 3 */ },
  email: 'jake@outdoorgrillcenter.com',
}

// 6 categories
const SAMPLE_BBQ_CATEGORIES = [
  { title: 'Pellet Grills', slug: 'pellet-grills', color: 'orange', description: 'Wood-fired pellet grills and smokers' },
  { title: 'Gas Grills', slug: 'gas-grills', color: 'blue', description: 'Propane and natural gas grills' },
  { title: 'Charcoal Grills', slug: 'charcoal-grills', color: 'green', description: 'Traditional charcoal and BBQ grills' },
  { title: 'Kamado Grills', slug: 'kamado-grills', color: 'purple', description: 'Ceramic kamado-style grills' },
  { title: 'Electric Smokers', slug: 'electric-smokers', color: 'pink', description: 'Electric smokers and vertical smokers' },
  { title: 'Portable Grills', slug: 'portable-grills', color: 'orange', description: 'Compact and portable grilling solutions' },
]

// 9 product reviews
const SAMPLE_PRODUCT_REVIEWS = [
  // All 9 products from Phase 4 with full review content from Phase 6
  // Each review object must include:
  // - title, slug, excerpt, body (Lexical), rating
  // - productName, productBrand, productModel, productPrice, productType
  // - amazonASIN (when applicable)
  // - prosAndCons: { pros: [], cons: [] }
  // - categoryIndex (0-5 to match categories above)
  // - featured (boolean - set first 2-3 as true)
]
```

### 7.4 Update Settings Global Data
**Target:** Settings object in seed script

**Required Settings:**
```typescript
await payload.updateGlobal({
  slug: 'settings',
  data: {
    title: 'Outdoor Grill Center',
    description: 'Expert reviews of outdoor grills, smokers, and BBQ equipment. Find your perfect grill with our in-depth product testing and ratings.',
    url: 'https://outdoorgrillcenter.com',
    copyright: '© 2025 Outdoor Grill Center. All rights reserved.',
    w3ckey: 'YOUR_WEB3FORMS_KEY', // Keep existing or update
    logo: logoMedia.id,
    logoalt: logoMedia.id,
  },
})
```

### 7.5 Update Seeding Process Flow
**Required modifications to the seed() function:**

1. Remove the existing data check (lines 408-420)
2. Add `clearAllData(payload)` call as first operation
3. Update media creation to use 1 author image + 9 product images + 1 logo = 11 total
4. Create only 1 author instead of 3
5. Create 6 categories instead of 5
6. Create 9 reviews instead of 5 posts (using collection: 'reviews')
7. Update console messages to reflect new counts and "reviews" terminology
8. Ensure all new fields (rating, productName, etc.) are populated for each review
9. Update all references from 'posts' to 'reviews' throughout the seed script

---

## Phase 8: Migration Generation

### 8.1 Generate Database Migration
After renaming and updating the Reviews collection schema (Phase 1), generate a migration:

```bash
pnpm payload migrate:create
```

This command will:
- Detect the collection rename from 'posts' to 'reviews'
- Analyze schema changes in Reviews collection (new fields)
- Auto-generate migration files in `src/migrations/`
- Create both TypeScript and JSON migration files

**Note:** Commit the generated migration files to version control.

**Important:** The migration will handle:
- Renaming the posts table to reviews
- Adding new columns for rating, productName, productBrand, etc.
- Adding the prosAndCons field structure

### 8.2 Update Frontend References
**Target:** All frontend components and API routes

**Required Updates:**
Search the codebase for all references to 'posts' collection and update to 'reviews':
- Update Payload API queries: `payload.find({ collection: 'posts' })` → `payload.find({ collection: 'reviews' })`
- Update frontend imports and type references
- Update route handlers
- Update any TypeScript types (e.g., `Post` → `Review`)
- Common locations to check:
  - `src/app/(website)/` - All page components
  - `src/components/` - Any components fetching posts
  - API routes or server actions

**Search Pattern:**
```bash
# Search for 'posts' references in the codebase
grep -r "collection.*posts" src/
grep -r "'posts'" src/
grep -r '"posts"' src/
```

---

## Phase 9: Testing & Validation

### 9.1 Execute Complete Seeding Process
Run the following commands in sequence:

```bash
# Optional: Clear existing D1 database (seed script now does this automatically)
rm -rf .wrangler/state

# Run the updated seed script
pnpm seed
```

**Expected Output:**
- 🗑️ All existing data cleared
- 🖼️ 11 media items created (1 author + 9 products + 1 logo)
- 📝 Settings updated with "Outdoor Grill Center" branding
- 📁 6 categories created
- 👤 1 author created (Jake Thompson)
- 📄 9 product review posts created with ratings
- ✅ All images uploaded to R2

### 9.2 Validate in Admin Panel
Start the development server and verify data:

```bash
pnpm dev
```

**Admin Panel Checklist:**
1. Navigate to `/admin`
2. Check **Reviews** collection:
   - Collection appears as "Reviews" (not "Posts")
   - All 9 reviews visible
   - Rating field displays (1-5 scale)
   - Product brand, name, model populated
   - Pros/cons lists present
   - Images display correctly
3. Check **Authors** collection:
   - Jake Thompson entry exists
   - Profile image loads
   - Bio renders correctly
4. Check **Categories** collection:
   - 6 categories present
   - Colors assigned correctly
5. Check **Media** collection:
   - 11 media items total
   - All images accessible
   - Alt text populated
6. Check **Settings** global:
   - Title: "Outdoor Grill Center"
   - Logo displays
   - All fields populated

### 9.3 Frontend Verification
Test the public-facing website:

**Homepage:**
- Featured reviews display (2-3 posts marked as featured)
- Product images load from R2
- Ratings display correctly

**Individual Review Pages:**
- Full review content renders
- Product specifications visible
- Pros/cons lists formatted properly
- Author bio displays
- Related categories link correctly

**Category Pages:**
- Filter by category works
- Correct products in each category

---

## Implementation Order (Priority Sequence)

Execute phases in this exact order for optimal workflow:

### Step 1: Schema Updates
- [ ] Phase 1.1: Rename Posts to Reviews collection
- [ ] Phase 1.2: Update Reviews collection schema with new fields
- [ ] Phase 2: Update Categories (ensure 6 categories)
- [ ] Phase 8.1: Generate migration files
- [ ] Phase 8.2: Update frontend references from 'posts' to 'reviews'

### Step 2: Content Preparation
- [ ] Phase 3: Create single author data
- [ ] Phase 4: Verify all 9 product specifications
- [ ] Phase 5: Source image URLs (10 images + 1 logo)
- [ ] Phase 6: Write all 9 product reviews (Lexical format)

### Step 3: Seed Script Updates
- [ ] Phase 7.1: Implement clearAllData function
- [ ] Phase 7.2: Update image URL constants
- [ ] Phase 7.3: Replace all sample data constants
- [ ] Phase 7.4: Update Settings global data
- [ ] Phase 7.5: Modify seed() function flow

### Step 4: Execution & Validation
- [ ] Phase 9.1: Run seed script
- [ ] Phase 9.2: Validate in admin panel
- [ ] Phase 9.3: Test frontend display

---

## Key Decisions & Notes

### Rating System
- Use 1-5 scale with 0.5 increments supported
- Display as star icons on frontend
- Required field for all reviews

### Image Strategy
- Download product images to local directory first
- Upload to R2 during seeding process
- Keep original URLs in comments for reference
- Ensure proper licensing/fair use

### Content Authenticity
- Base reviews on actual product specifications
- Reference real user feedback where possible
- Maintain objective, honest tone
- Disclose affiliate relationships if applicable

### SEO Considerations
- Include product model numbers in titles
- Use descriptive slugs (e.g., "traeger-ironwood-885-review")
- Optimize excerpts for search
- Include product specifications for schema markup potential

---

## Files to be Modified

### Collections
- 🔄 `src/collections/Posts.ts` → `src/collections/Reviews.ts` - Rename file, update slug, add review fields
- ✏️ `src/collections/Categories.ts` - No changes needed
- ✏️ `src/collections/Authors.ts` - No changes needed

### Configuration
- ✏️ `src/payload.config.ts` - Update import from `Posts` to `Reviews`

### Scripts
- ✏️ `scripts/seed-payload.ts` - Complete rewrite of sample data, update all 'posts' references to 'reviews'

### Migrations
- 🆕 `src/migrations/[timestamp].ts` - Auto-generated (will handle table rename and new fields)

### Frontend (may need updates)
- ⚠️ Any frontend components referencing 'posts' collection need to be updated to 'reviews'
- ⚠️ API routes or queries using 'posts' need to be updated to 'reviews'

### Documentation
- ✏️ `README.md` - Update with review system info

---

## Risk Mitigation

### Backup Strategy
Before running the clearing process:
1. Export existing D1 database
2. Backup R2 bucket contents
3. Create git commit before changes

### Rollback Plan
If issues arise:
1. Restore D1 database from backup
2. Restore R2 bucket
3. Git reset to previous commit
4. Run previous migration

### Testing Checklist
- [ ] Collection renamed from 'posts' to 'reviews' successfully
- [ ] All reviews have ratings (1-5)
- [ ] Product names and brands populated
- [ ] Images display correctly in admin
- [ ] Images display correctly on frontend
- [ ] Categories properly assigned
- [ ] Authors properly assigned
- [ ] Pros/cons display properly
- [ ] Reading time calculated correctly
- [ ] SEO fields populated
- [ ] Mobile display works
- [ ] All links functional
- [ ] Frontend components updated to use 'reviews' collection

---

## Future Enhancements (Post-Launch)

### Phase 11: Advanced Features
- Add comparison table functionality
- Implement filtering by rating
- Add price tracking over time
- Create "Best Of" category pages
- Add user comments/reviews
- Implement affiliate link tracking
- Add video reviews
- Create buying guides

### Phase 12: Content Expansion
- Add 20+ more product reviews
- Create category comparison articles
- Add cooking tips and recipes
- Create seasonal buying guides
- Add maintenance guides

---

## Success Criteria

### Completion Requirements
- ✅ All 9 products have complete reviews with ratings
- ✅ All 11 images uploaded and displaying (1 author + 9 products + 1 logo)
- ✅ Rating system functional (1-5 scale with 0.5 increments)
- ✅ 6 categories properly organized
- ✅ Single author (Jake Thompson) created with bio and image
- ✅ All product fields populated (brand, model, price, ASIN, type)
- ✅ Pros/cons lists complete for each product
- ✅ Admin panel displays all new fields correctly
- ✅ Frontend renders reviews with proper formatting
- ✅ Seed script successfully clears and re-seeds on every run
- ✅ R2 storage contains all images
- ✅ D1 database contains all structured data

### Quality Requirements
- Each review: 1,200-1,800 words
- Each product: 1 high-quality image minimum
- Each pros/cons list: 4-6 pros, 3-5 cons
- All technical specifications accurate and complete
- SEO fields (title, excerpt, slug) 100% complete
- No placeholder text or dummy data
- All URLs functional and accessible

---

## LLM Execution Notes

**When implementing this plan:**
1. Work through phases sequentially as listed in Implementation Order
2. Do not skip steps or phases
3. Verify each phase's output before proceeding
4. Use actual product data - no placeholders
5. Generate realistic, detailed review content
6. Test thoroughly after seed script runs
7. Ensure all 9 products from Phase 4 are included (including PB150PPG)
8. Maintain consistent tone and style across all reviews
9. Double-check Lexical JSON format for all rich text fields
10. Verify image URLs are accessible before adding to seed script

**Critical Requirements:**
- RENAME collection from 'posts' to 'reviews'
- ONE author only (not 3)
- NINE products total (not 8)
- SIX categories (including Portable Grills)
- Complete data clearing before every seed
- All new schema fields must be populated
- Update all 'posts' references to 'reviews' in seed script and config

---

*Document Type: LLM Implementation Instructions*
*Project: Outdoor Grill Center - BBQ Review System*
*Version: 2.0*
*Last Updated: November 9, 2025*
