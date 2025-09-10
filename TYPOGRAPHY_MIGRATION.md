# Typography Migration Guide

This document outlines the process for migrating styles from the official Tailwind CSS Typography plugin (`typography.css`) to our custom `tw-prose` package using Tailwind CSS v4 variables.

## Overview

The goal is to create a complete CSS-only version of the Tailwind Typography plugin that:

- Uses `@utility` directives compatible with Tailwind CSS v4
- Utilizes official Tailwind v4 CSS variables for consistency
- Provides all typography styling without requiring the JavaScript plugin
- Maintains full compatibility with dark mode and responsive design

## Source Files

### Primary Sources

1. **`typography.css`** - The official Tailwind Typography plugin CSS output
   - Contains all the prose styling rules
   - Includes all element selectors and their properties
   - Source of truth for what elements should be styled

2. **`tailwind-v4-variables.md`** - Reference document for Tailwind v4 variables
   - Contains exact variable names for colors, spacing, typography, etc.
   - Use this to find the correct v4 variable equivalents

### Target File

- **`packages/tw-prose/index.css`** - Our custom implementation

## Migration Process

### Step 1: Analyze typography.css Structure

Read through `typography.css` and identify:

- All HTML elements being styled (h1-h6, p, a, strong, em, code, pre, ul, ol, li, table, etc.)
- CSS properties applied to each element
- Color values, spacing values, font sizes, etc.
- Responsive modifiers (prose-sm, prose-lg, prose-xl, prose-2xl)
- Dark mode variants (prose-invert)

### Step 2: Map CSS Properties to Tailwind v4 Variables

For each CSS property found in typography.css, find the equivalent Tailwind v4 variable:

#### Color Mapping

- `#374151` → `--color-gray-700` or custom `--tw-prose-*` variables
- `#111827` → `--color-gray-900` or custom variables
- Use `tailwind-v4-variables.md` to find exact color variable names

#### Spacing Mapping

- `1.25rem` → `calc(var(--spacing) * 5)` (since 1rem = var(--spacing) \* 4)
- `0.5rem` → `calc(var(--spacing) * 2)`
- `2rem` → `calc(var(--spacing) * 8)`

#### Typography Mapping

- `font-size: 1.5rem` → `font-size: var(--text-2xl)`
- `font-size: 1.125rem` → `font-size: var(--text-lg)`
- `line-height: 1.75` → `line-height: var(--leading-7)`
- `font-weight: 600` → `font-weight: var(--font-weight-semibold)`

### Step 3: Convert Selectors to @utility Format

Transform standard CSS selectors to `@utility` directive format:

#### Before (typography.css):

```css
.prose h1 {
  color: #111827;
  font-size: 2.25rem;
  font-weight: 800;
}
```

#### After (index.css):

```css
@utility prose {
  & :where(h1):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
    color: var(--tw-prose-headings);
    font-size: var(--text-4xl);
    font-weight: var(--font-weight-extrabold);
  }
}
```

### Step 4: Implement CSS Variables System

Create CSS custom properties for theming:

```css
@utility prose {
  /* Light theme variables */
  --tw-prose-body: #374151;
  --tw-prose-headings: #111827;
  --tw-prose-lead: #4b5563;
  --tw-prose-links: #111827;
  /* ... more variables */

  /* Dark theme variables */
  --tw-prose-invert-body: #d1d5db;
  --tw-prose-invert-headings: #fff;
  /* ... more invert variables */
}
```

### Step 5: Handle Size Variants

Create separate `@utility` directives for each size:

```css
@utility prose-sm {
  font-size: var(--text-sm);
  line-height: var(--text-sm--line-height);

  & :where(h1):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
    font-size: var(--text-3xl);
    /* ... adjusted sizes */
  }
}
```

## Implementation Checklist

### Core Elements to Style

- [ ] **Headings**: h1, h2, h3, h4, h5, h6
- [ ] **Text**: p, strong, em, small, mark, del, ins
- [ ] **Links**: a (with various states)
- [ ] **Lists**: ul, ol, li (including nested lists)
- [ ] **Code**: code, pre, kbd
- [ ] **Tables**: table, thead, tbody, tfoot, tr, th, td
- [ ] **Media**: img, video, figure, figcaption
- [ ] **Quotes**: blockquote, q, cite
- [ ] **Other**: hr, dl, dt, dd, address, abbr, sub, sup

### Size Variants

- [ ] `prose-sm` - Small/compact typography
- [ ] `prose` - Default size (base)
- [ ] `prose-lg` - Large typography
- [ ] `prose-xl` - Extra large typography
- [ ] `prose-2xl` - Huge typography

### Theme Support

- [ ] Light mode colors (default variables)
- [ ] Dark mode colors (invert variables)
- [ ] Proper CSS variable usage throughout

### Advanced Features

- [ ] Form elements (input, select, textarea, button, etc.)
- [ ] Interactive elements (details, summary)
- [ ] Semantic elements (time, address, fieldset, legend)
- [ ] Proper `:where()` selector usage with `not-prose` exclusions

## Variable Reference Quick Guide

### Common Conversions

#### Spacing (1rem = --spacing \* 4)

- `0.25rem` = `calc(var(--spacing) * 1)`
- `0.5rem` = `calc(var(--spacing) * 2)`
- `0.75rem` = `calc(var(--spacing) * 3)`
- `1rem` = `calc(var(--spacing) * 4)`
- `1.25rem` = `calc(var(--spacing) * 5)`
- `1.5rem` = `calc(var(--spacing) * 6)`
- `2rem` = `calc(var(--spacing) * 8)`

#### Font Sizes

- `var(--text-xs)` = 0.75rem
- `var(--text-sm)` = 0.875rem
- `var(--text-base)` = 1rem
- `var(--text-lg)` = 1.125rem
- `var(--text-xl)` = 1.25rem
- `var(--text-2xl)` = 1.5rem
- `var(--text-3xl)` = 1.875rem
- `var(--text-4xl)` = 2.25rem

#### Font Weights

- `var(--font-weight-normal)` = 400
- `var(--font-weight-medium)` = 500
- `var(--font-weight-semibold)` = 600
- `var(--font-weight-bold)` = 700
- `var(--font-weight-extrabold)` = 800

## Testing Strategy

1. **Visual Comparison**: Compare output with official Typography plugin
2. **Element Coverage**: Ensure all HTML elements are properly styled
3. **Responsive Design**: Test all size variants (sm, base, lg, xl, 2xl)
4. **Dark Mode**: Verify dark mode works with class-based toggling
5. **Edge Cases**: Test nested elements, mixed content, unusual combinations

## Notes

- Always use `calc(var(--spacing) * N)` for spacing calculations
- Prefer Tailwind v4 variables over hardcoded values
- Maintain the `:where()` selector pattern for specificity control
- Include `not-prose` exclusions for all selectors
- Test thoroughly in both light and dark modes

## File Structure

```
packages/tw-prose/
├── index.css          # Main implementation file
├── package.json       # Package configuration
└── dist/
    └── index.css      # Built version (copy of index.css)
```

This migration process ensures our `tw-prose` package provides complete feature parity with the official Tailwind Typography plugin while being fully compatible with Tailwind CSS v4.
