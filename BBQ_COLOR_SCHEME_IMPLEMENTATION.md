# BBQ Website Color Scheme Implementation Plan

## Overview
This document provides comprehensive instructions for implementing the BBQ-themed color scheme across the Outdoor Grill Center website. The implementation uses Tailwind CSS v4's CSS-first configuration approach.

---

## Color Palette Reference

### Primary Colors
- **Smoky Charcoal** `#2D2D2D` - Main text, headers, navigation
- **Fire Red** `#D32F2F` - Primary CTAs, key highlights

### Secondary Colors
- **Sunset Orange** `#FF6F00` - Secondary buttons, hover states
- **Golden Amber** `#FFA726` - Icons, badges, highlights
- **Hickory Brown** `#6D4C41` - Borders, dividers, secondary text

### Accent & Utility Colors
- **Fresh Herb Green** `#7CB342` - Success states, fresh ingredients
- **Cream** `#FFF8E1` - Background sections, cards
- **Smoke Gray** `#9E9E9E` - Disabled states, subtle text

---

## Implementation Steps

### Step 1: Update Global CSS Configuration

**File:** `src/app/global.css`

**Action:** Replace the single Tailwind import with custom theme variables using Tailwind v4's CSS-first configuration.

**Current Code:**
```css
@import "tailwindcss";
```

**New Code:**
```css
@import "tailwindcss";

@theme {
  /* BBQ Color Palette - Primary Colors */
  --color-smoky-charcoal: #2D2D2D;
  --color-fire-red: #D32F2F;

  /* BBQ Color Palette - Secondary Colors */
  --color-sunset-orange: #FF6F00;
  --color-golden-amber: #FFA726;
  --color-hickory-brown: #6D4C41;

  /* BBQ Color Palette - Accent & Utility */
  --color-fresh-herb-green: #7CB342;
  --color-cream: #FFF8E1;
  --color-smoke-gray: #9E9E9E;

  /* Semantic Color Mappings */
  --color-primary: var(--color-fire-red);
  --color-primary-hover: #B71C1C; /* Darker red for hover */
  --color-secondary: var(--color-sunset-orange);
  --color-secondary-hover: #E65100; /* Darker orange for hover */
  --color-accent: var(--color-golden-amber);
  --color-success: var(--color-fresh-herb-green);
  --color-text-primary: var(--color-smoky-charcoal);
  --color-text-secondary: var(--color-hickory-brown);
  --color-text-muted: var(--color-smoke-gray);
  --color-background-light: var(--color-cream);
  --color-border: var(--color-hickory-brown);

  /* Dark Mode Variants */
  --color-dark-bg: #1A1A1A;
  --color-dark-text: #F5F5F5;
  --color-dark-border: #3D3D3D;
}

/* Base Typography Styles */
body {
  color: var(--color-text-primary);
}

h1, h2, h3, h4, h5, h6 {
  color: var(--color-text-primary);
  font-weight: 700;
}

/* Link Styles */
a {
  color: var(--color-primary);
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-primary-hover);
}

/* Background Utility Classes */
.bg-bbq-light {
  background-color: var(--color-background-light);
}

.bg-bbq-cream {
  background-color: var(--color-cream);
}

/* Border Utility Classes */
.border-bbq {
  border-color: var(--color-border);
}

/* Button Base Styles */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(211, 47, 47, 0.2);
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: var(--color-secondary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(255, 111, 0, 0.2);
}

/* Card Styles */
.card-bbq {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.card-bbq:hover {
  box-shadow: 0 10px 25px rgba(109, 76, 65, 0.15);
  transform: translateY(-2px);
}
```

---

### Step 2: Update Navigation Component

**Current State:** Navigation likely uses default blue or gray tones

**Files to Update:**
- Any header/navigation components in `/src/components/`
- Main navigation in `/src/app/` layout files

**Changes:**
```jsx
// Before (example)
<nav className="bg-white border-b border-gray-200">
  <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
</nav>

// After
<nav className="bg-white border-b border-bbq">
  <a href="/" className="text-smoky-charcoal hover:text-fire-red transition-colors">Home</a>
</nav>
```

**Implementation:**
1. Replace all navigation background colors with `bg-white` or `bg-bbq-cream`
2. Update text colors to use `text-smoky-charcoal`
3. Set hover states to `hover:text-fire-red`
4. Update borders to `border-bbq` or `border-hickory-brown`

---

### Step 3: Update Button Components

**Current Issues:** Undefined `brand-primary` and `brand-secondary` colors

**Files Affected (from analysis):**
- `/src/components/review/ReviewCard.js`
- `/src/components/blog/BlogPostCard.js`
- Any CTA components

**Amazon Button Pattern:**
```jsx
// Current Amazon CTA (keep the orange for Amazon branding)
<a className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">
  Check Price on Amazon
</a>

// Primary CTA Buttons (NEW)
<button className="btn-primary">
  Read Full Review
</button>

// Secondary Action Buttons (NEW)
<button className="btn-secondary">
  View All Reviews
</button>

// Outline Buttons (NEW)
<button className="border-2 border-fire-red text-fire-red hover:bg-fire-red hover:text-white px-6 py-3 rounded-lg transition-all">
  Learn More
</button>
```

**Search & Replace:**
- Find: `bg-brand-primary` → Replace: `bg-[var(--color-primary)]` or use `btn-primary` class
- Find: `text-brand-primary` → Replace: `text-[var(--color-primary)]`
- Find: `bg-brand-secondary` → Replace: `bg-[var(--color-secondary)]`

---

### Step 4: Update ProductTypeBadge Component

**File:** `/src/components/review/ProductTypeBadge.js`

**Current System:** Already has sophisticated color mapping for grill types

**Recommendation:** Align badge colors with BBQ palette while maintaining distinctiveness

**Updated Badge Colors:**
```javascript
const typeStyles = {
  'pellet-grill': {
    light: 'bg-sunset-orange/10 text-sunset-orange border-sunset-orange/20',
    dark: 'dark:bg-sunset-orange/20 dark:text-sunset-orange dark:border-sunset-orange/30'
  },
  'gas-grill': {
    light: 'bg-fire-red/10 text-fire-red border-fire-red/20',
    dark: 'dark:bg-fire-red/20 dark:text-fire-red dark:border-fire-red/30'
  },
  'charcoal-grill': {
    light: 'bg-smoky-charcoal/10 text-smoky-charcoal border-smoky-charcoal/20',
    dark: 'dark:bg-gray-300/20 dark:text-gray-200 dark:border-gray-300/30'
  },
  'kamado': {
    light: 'bg-hickory-brown/10 text-hickory-brown border-hickory-brown/20',
    dark: 'dark:bg-hickory-brown/20 dark:text-[#A1887F] dark:border-hickory-brown/30'
  },
  'electric-smoker': {
    light: 'bg-golden-amber/10 text-[#F57C00] border-golden-amber/20',
    dark: 'dark:bg-golden-amber/20 dark:text-golden-amber dark:border-golden-amber/30'
  },
  'portable': {
    light: 'bg-fresh-herb-green/10 text-fresh-herb-green border-fresh-herb-green/20',
    dark: 'dark:bg-fresh-herb-green/20 dark:text-fresh-herb-green dark:border-fresh-herb-green/30'
  },
  'smoker': {
    light: 'bg-smoke-gray/10 text-smoke-gray border-smoke-gray/20',
    dark: 'dark:bg-smoke-gray/20 dark:text-smoke-gray dark:border-smoke-gray/30'
  }
}
```

**Update the component to use CSS custom properties:**
```jsx
<span className={cn(
  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
  typeStyles[type]?.light,
  typeStyles[type]?.dark
)}>
  {icon}
  {displayName}
</span>
```

---

### Step 5: Update Review Components

**Files to Update:**
- `/src/components/review/ReviewCard.js`
- `/src/components/review/ReviewHero.js`
- `/src/components/review/ReviewQuickInfo.js`
- `/src/components/review/ProsAndCons.js`
- `/src/components/review/ReviewBody.js`
- `/src/components/review/ReviewRating.js`

**ReviewCard.js Updates:**
```jsx
// Replace card backgrounds and borders
<div className="card-bbq overflow-hidden">
  {/* Card content */}
</div>

// Update heading colors
<h3 className="text-xl font-bold text-smoky-charcoal group-hover:text-fire-red transition-colors">
  {title}
</h3>

// Update rating star colors (if applicable)
<div className="text-golden-amber">
  {/* Star icons */}
</div>
```

**ProsAndCons.js Updates:**
```jsx
// Pros section - use Fresh Herb Green
<div className="bg-fresh-herb-green/5 border border-fresh-herb-green/20 rounded-lg p-4">
  <h3 className="flex items-center gap-2 text-lg font-semibold text-fresh-herb-green mb-3">
    <CheckCircle className="w-5 h-5" />
    Pros
  </h3>
  <ul className="space-y-2">
    {pros.map((pro, i) => (
      <li key={i} className="flex items-start gap-2 text-smoky-charcoal">
        <Check className="w-4 h-4 text-fresh-herb-green mt-0.5 flex-shrink-0" />
        <span>{pro}</span>
      </li>
    ))}
  </ul>
</div>

// Cons section - use Fire Red
<div className="bg-fire-red/5 border border-fire-red/20 rounded-lg p-4">
  <h3 className="flex items-center gap-2 text-lg font-semibold text-fire-red mb-3">
    <XCircle className="w-5 h-5" />
    Cons
  </h3>
  <ul className="space-y-2">
    {cons.map((con, i) => (
      <li key={i} className="flex items-start gap-2 text-smoky-charcoal">
        <X className="w-4 h-4 text-fire-red mt-0.5 flex-shrink-0" />
        <span>{con}</span>
      </li>
    ))}
  </ul>
</div>
```

**ReviewRating.js Updates:**
```jsx
// Star rating component
<div className="flex items-center gap-1">
  {[...Array(5)].map((_, i) => (
    <Star
      key={i}
      className={cn(
        "w-5 h-5",
        i < Math.floor(rating)
          ? "fill-golden-amber text-golden-amber"
          : "fill-smoke-gray/20 text-smoke-gray/20"
      )}
    />
  ))}
  <span className="ml-2 text-sm font-medium text-smoky-charcoal">
    {rating.toFixed(1)}
  </span>
</div>
```

---

### Step 6: Update Typography & Text Colors

**Global Text Color Updates:**

```css
/* In global.css - already added above */
.text-primary {
  color: var(--color-text-primary);
}

.text-secondary {
  color: var(--color-text-secondary);
}

.text-muted {
  color: var(--color-text-muted);
}
```

**Component Text Updates:**
- Main headings: `text-smoky-charcoal`
- Body text: `text-smoky-charcoal` or `text-gray-800`
- Secondary text: `text-hickory-brown`
- Muted text: `text-smoke-gray`
- Links: `text-fire-red hover:text-[#B71C1C]`

---

### Step 7: Update Background Sections

**Current Screenshot Analysis:**
The current design uses white backgrounds with minimal color variation.

**New Background Pattern:**
```jsx
// Alternating sections for visual interest
<section className="bg-white py-12">
  {/* Content */}
</section>

<section className="bg-bbq-cream py-12">
  {/* Alternate section */}
</section>

<section className="bg-gradient-to-br from-cream to-white py-16">
  {/* Hero sections with subtle gradient */}
</section>
```

**Hero Section Updates:**
```jsx
// Review hero with warm gradient
<div className="bg-gradient-to-r from-fire-red/5 via-sunset-orange/5 to-golden-amber/5 py-16">
  <div className="container mx-auto px-4">
    <h1 className="text-4xl font-bold text-smoky-charcoal mb-4">
      {reviewTitle}
    </h1>
    {/* Content */}
  </div>
</div>
```

---

### Step 8: Update Category Pages

**Files:**
- Category badge components
- Category listing pages
- Category filter components

**Category Color Mapping:**
```jsx
const categoryColors = {
  'pellet-grills': {
    bg: 'bg-sunset-orange/10',
    text: 'text-sunset-orange',
    border: 'border-sunset-orange/30',
    hover: 'hover:bg-sunset-orange/20'
  },
  'gas-grills': {
    bg: 'bg-fire-red/10',
    text: 'text-fire-red',
    border: 'border-fire-red/30',
    hover: 'hover:bg-fire-red/20'
  },
  'charcoal-grills': {
    bg: 'bg-smoky-charcoal/10',
    text: 'text-smoky-charcoal',
    border: 'border-smoky-charcoal/30',
    hover: 'hover:bg-smoky-charcoal/20'
  },
  'kamado-grills': {
    bg: 'bg-hickory-brown/10',
    text: 'text-hickory-brown',
    border: 'border-hickory-brown/30',
    hover: 'hover:bg-hickory-brown/20'
  },
  'electric-smokers': {
    bg: 'bg-golden-amber/10',
    text: 'text-golden-amber',
    border: 'border-golden-amber/30',
    hover: 'hover:bg-golden-amber/20'
  },
  'portable-grills': {
    bg: 'bg-fresh-herb-green/10',
    text: 'text-fresh-herb-green',
    border: 'border-fresh-herb-green/30',
    hover: 'hover:bg-fresh-herb-green/20'
  }
}
```

---

### Step 9: Update Form Elements

**Input Fields:**
```jsx
<input
  type="text"
  className="w-full px-4 py-2 border-2 border-hickory-brown/30 rounded-lg
             focus:border-fire-red focus:ring-2 focus:ring-fire-red/20
             text-smoky-charcoal placeholder:text-smoke-gray
             transition-all"
  placeholder="Search reviews..."
/>
```

**Select Dropdowns:**
```jsx
<select className="px-4 py-2 border-2 border-hickory-brown/30 rounded-lg
                   focus:border-sunset-orange focus:ring-2 focus:ring-sunset-orange/20
                   text-smoky-charcoal bg-white
                   transition-all">
  <option>Filter by category</option>
</select>
```

**Checkboxes/Radio Buttons:**
```jsx
<input
  type="checkbox"
  className="w-5 h-5 text-fire-red border-hickory-brown/30 rounded
             focus:ring-2 focus:ring-fire-red/20"
/>
```

---

### Step 10: Update Footer

**Footer Color Scheme:**
```jsx
<footer className="bg-smoky-charcoal text-cream py-12">
  <div className="container mx-auto px-4">
    {/* Footer content */}
    <div className="border-t border-hickory-brown/30 mt-8 pt-8">
      <p className="text-smoke-gray text-sm text-center">
        © 2025 Outdoor Grill Center. All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

**Footer Links:**
```jsx
<a href="/about" className="text-cream hover:text-golden-amber transition-colors">
  About Us
</a>
```

---

### Step 11: Update Icon Colors

**Strategy:** Use Golden Amber for positive/featured icons, Fire Red for CTAs

```jsx
// Featured icons
<Flame className="w-5 h-5 text-golden-amber" />
<Star className="w-5 h-5 text-golden-amber" />
<Award className="w-5 h-5 text-golden-amber" />

// Navigation/UI icons
<Menu className="w-6 h-6 text-smoky-charcoal" />
<Search className="w-5 h-5 text-hickory-brown" />

// CTA icons
<ShoppingCart className="w-5 h-5 text-fire-red" />
<ExternalLink className="w-4 h-4 text-sunset-orange" />
```

---

### Step 12: Add Hover Effects & Transitions

**Card Hover Effects:**
```jsx
<div className="card-bbq group cursor-pointer">
  <img
    src={image}
    alt={title}
    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
  />
  <div className="p-6">
    <h3 className="text-xl font-bold text-smoky-charcoal group-hover:text-fire-red transition-colors duration-200">
      {title}
    </h3>
  </div>
</div>
```

**Link Hover Effects:**
```jsx
<a href="#" className="inline-flex items-center gap-2 text-fire-red hover:text-sunset-orange transition-all duration-200 group">
  Read more
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
</a>
```

---

### Step 13: Dark Mode Considerations

**Strategy:** Since dark mode is already supported, update dark mode variants

```jsx
// Example: Card with dark mode
<div className="bg-white dark:bg-dark-bg border border-bbq dark:border-dark-border rounded-lg p-6">
  <h3 className="text-smoky-charcoal dark:text-dark-text">
    {title}
  </h3>
  <p className="text-hickory-brown dark:text-smoke-gray">
    {description}
  </p>
</div>

// Buttons in dark mode
<button className="btn-primary dark:bg-sunset-orange dark:hover:bg-[#E65100]">
  Click Me
</button>
```

---

### Step 14: Update Screenshot Component Styles

**Based on Current Screenshot:**

**Author Bio Card:**
```jsx
<div className="bg-gradient-to-br from-smoky-charcoal to-[#1A1A1A] text-cream rounded-2xl p-8">
  <div className="flex items-start gap-6">
    <img
      src={authorImage}
      alt={authorName}
      className="w-24 h-24 rounded-full border-4 border-golden-amber"
    />
    <div>
      <h3 className="text-2xl font-bold text-cream mb-2">
        About {authorName}
      </h3>
      <p className="text-smoke-gray mb-4">
        {bio}
      </p>
      <a href="#" className="text-golden-amber hover:text-sunset-orange transition-colors">
        View Profile →
      </a>
    </div>
  </div>
</div>
```

**Review Content Headers:**
```jsx
<h2 className="text-2xl font-bold text-smoky-charcoal mb-4 pb-2 border-b-2 border-hickory-brown/30">
  Performance
</h2>

<h2 className="text-2xl font-bold text-smoky-charcoal mb-4 pb-2 border-b-2 border-fire-red/30">
  Final Verdict
</h2>
```

**Date/Meta Info:**
```jsx
<div className="flex items-center gap-4 text-sm text-hickory-brown">
  <span className="flex items-center gap-1">
    <Calendar className="w-4 h-4 text-smoke-gray" />
    November 09, 2025
  </span>
  <span className="flex items-center gap-1">
    <Clock className="w-4 h-4 text-smoke-gray" />
    1 min read
  </span>
</div>
```

---

## Testing Checklist

After implementing the color scheme, test the following:

### Visual Testing
- [ ] All pages load without color errors
- [ ] No undefined CSS custom properties in browser console
- [ ] All badges display correct colors
- [ ] Hover states work smoothly
- [ ] Transitions are smooth (not jarring)
- [ ] Links are visually distinct and clickable

### Accessibility Testing
- [ ] Text contrast ratios meet WCAG AA standards (4.5:1 for normal text)
- [ ] Button states are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Color is not the only means of conveying information

### Component Testing
- [ ] ReviewCard displays correctly with new colors
- [ ] ProductTypeBadge shows all grill types with distinct colors
- [ ] ProsAndCons section has clear visual distinction
- [ ] Rating stars display in Golden Amber
- [ ] CTA buttons are prominent and clickable
- [ ] Navigation updates on hover
- [ ] Footer displays correctly with dark background

### Responsive Testing
- [ ] Mobile view (320px - 767px)
- [ ] Tablet view (768px - 1023px)
- [ ] Desktop view (1024px+)
- [ ] Colors work across all breakpoints

### Dark Mode Testing
- [ ] Dark mode toggle works
- [ ] All colors have appropriate dark variants
- [ ] Contrast is maintained in dark mode
- [ ] Images and icons display correctly

---

## Browser Compatibility

Test in the following browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## Rollback Plan

If issues arise, you can quickly revert by:

1. Restore original `global.css`:
```css
@import "tailwindcss";
```

2. Git revert if changes were committed:
```bash
git revert HEAD
```

3. Keep a backup of original components before making changes

---

## Performance Considerations

**CSS Custom Properties Impact:**
- Minimal performance impact (CSS variables are optimized)
- No additional JavaScript required
- Tailwind will tree-shake unused utilities

**Image Optimization:**
- Ensure BBQ product images are optimized
- Use Next.js Image component for automatic optimization
- Consider WebP format for better compression

---

## Future Enhancements

### Phase 2 Improvements (Post-Initial Implementation)
1. **Gradient Overlays:** Add subtle fire/smoke gradients to hero sections
2. **Animation Effects:** Subtle flame flicker animations for featured products
3. **Seasonal Themes:** Summer vs. Winter color variations
4. **Interactive Elements:** Animated embers or smoke particles
5. **Custom Illustrations:** BBQ-themed iconography

### Advanced Color Features
- Color picker for admin users to customize brand colors
- A/B testing different color variations for CTAs
- Analytics integration to track color scheme performance

---

## File Modification Summary

### Files to Create
- None (all changes are modifications to existing files)

### Files to Modify
1. `src/app/global.css` - Add BBQ color theme variables
2. `src/components/review/ProductTypeBadge.js` - Update badge colors
3. `src/components/review/ReviewCard.js` - Update card styling
4. `src/components/review/ReviewRating.js` - Update star colors
5. `src/components/review/ProsAndCons.js` - Update pros/cons colors
6. `src/components/review/ReviewHero.js` - Update hero section
7. `src/components/review/ReviewQuickInfo.js` - Update info colors
8. Navigation components - Update nav colors
9. Button components - Replace brand-primary/secondary
10. Footer components - Update footer styling
11. Category page components - Update category colors
12. Form components - Update input styling

### Search & Replace Operations
```bash
# Find undefined brand colors and replace
brand-primary → [var(--color-primary)] or use btn-primary class
brand-secondary → [var(--color-secondary)] or use btn-secondary class
blue-600 → fire-red (for primary CTAs)
blue-500 → sunset-orange (for secondary actions)
gray-800 → smoky-charcoal (for text)
gray-500 → hickory-brown (for secondary text)
gray-400 → smoke-gray (for muted text)
green-600 → fresh-herb-green (for success states)
```

---

## Additional Resources

**Color Palette Tools:**
- [Coolors.co](https://coolors.co/) - Generate color variations
- [ColorBox by Lyft](https://colorbox.io/) - Create accessible color systems
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verify WCAG compliance

**Tailwind CSS v4 Documentation:**
- [Tailwind CSS v4 Theme Configuration](https://tailwindcss.com/docs/v4-migration)
- [CSS-First Configuration Guide](https://tailwindcss.com/docs/v4-migration#css-first-configuration)

**Design Inspiration:**
- Weber Grills website - Professional BBQ brand styling
- Traeger Grills - Modern pellet grill design patterns
- BBQ competition websites - Authentic BBQ aesthetics

---

## Success Metrics

Track these metrics post-implementation:

1. **User Engagement:**
   - Time on site
   - Pages per session
   - Bounce rate (should decrease with improved visual appeal)

2. **Conversion Metrics:**
   - Click-through rate on Amazon affiliate links
   - Newsletter signup rate
   - Review read completion rate

3. **Visual Consistency:**
   - Reduction in color-related bug reports
   - Improved brand recognition (user surveys)
   - Consistent experience across devices

4. **Accessibility Scores:**
   - Lighthouse accessibility score (target: 95+)
   - WAVE accessibility errors (target: 0)
   - Keyboard navigation success rate

---

## Support & Maintenance

**Post-Implementation:**
1. Monitor browser console for CSS errors
2. Check analytics for unusual user behavior
3. Gather user feedback on new color scheme
4. Document any custom color combinations for future reference
5. Update style guide with new color palette

**Quarterly Reviews:**
- Assess color scheme effectiveness
- Review accessibility compliance
- Update colors based on user feedback
- Refresh seasonal color variations

---

## Implementation Timeline

**Estimated Time:** 6-8 hours total

1. **Hour 1-2:** Update global.css and test CSS variables
2. **Hour 3-4:** Update core components (buttons, cards, badges)
3. **Hour 5:** Update navigation and footer
4. **Hour 6:** Update review-specific components
5. **Hour 7:** Testing and refinement
6. **Hour 8:** Documentation and deployment

---

## Conclusion

This comprehensive plan provides everything needed to transform the Outdoor Grill Center website with a BBQ-themed color palette that:
- Enhances appetite appeal and engagement
- Maintains excellent accessibility standards
- Creates a cohesive brand identity
- Improves conversion rates through strategic color psychology
- Delivers a warm, inviting user experience

Follow the steps sequentially, test thoroughly, and the result will be a professional, BBQ-themed website that resonates with outdoor cooking enthusiasts.

**Questions or issues?** Refer to the Rollback Plan section or consult the Tailwind CSS v4 documentation.
