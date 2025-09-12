# tw-prose

CSS-only version of Tailwind Typography plugin for Tailwind CSS v4 with all prose variants.

## Installation

```bash
npm install tw-prose
```

## Usage

### With Tailwind CSS v4

```css
@import "tailwindcss";
@import "tw-prose";
```

### HTML Usage

```html
<!-- Basic usage -->
<article class="prose">
  <h1>Your Beautiful Typography</h1>
  <p>This paragraph will have perfect typography styling.</p>
  <ul>
    <li>Lists work great</li>
    <li>With proper spacing</li>
  </ul>
</article>

<!-- Size variants (always use with base prose class) -->
<article class="prose prose-sm">
  <h2>Compact Typography</h2>
  <p>Smaller text for dense layouts.</p>
</article>

<article class="prose prose-lg">
  <h2>Large Typography</h2>
  <p>More spacious and comfortable reading.</p>
</article>

<!-- Dark mode -->
<article class="prose prose-invert">
  <h2>Dark Theme</h2>
  <p>Perfect for dark backgrounds.</p>
</article>
```

## Available Classes

**Base class (always required):**

- `.prose` - Default typography styling

**Size variants (use with `.prose`):**

- `.prose prose-sm` - Small/compact typography
- `.prose prose-lg` - Large typography
- `.prose prose-xl` - Extra large typography
- `.prose prose-2xl` - 2X large typography

**Theme variants:**

- `.prose-invert` - Dark theme colors (use with dark backgrounds)

## Features

- ✅ **Complete prose styling** for all HTML elements (headings, paragraphs, lists, tables, code, etc.)
- ✅ **Multiple size variants** with proportional scaling
- ✅ **Dark mode support** with CSS variables
- ✅ **No JavaScript required** - pure CSS implementation
- ✅ **Compatible with Tailwind CSS v4** stable release
- ✅ **Low specificity** using CSS `:where()` pseudo-class
- ✅ **Semantic HTML** styling with opt-out `.not-prose` class

## What's Different from Official @tailwindcss/typography?

**✅ What this includes:**

- All core prose styling (headings, paragraphs, lists, tables, code blocks, blockquotes, etc.)
- Size variants: `prose-sm`, `prose-lg`, `prose-xl`, `prose-2xl`
- Dark mode support with `prose-invert`
- CSS-only approach (no plugin required)
- Smaller bundle size

**❌ What this doesn't include:**

- Element-specific modifiers (`prose-headings:{utility}`, `prose-p:{utility}`, etc.)
- Color variants (`prose-red`, `prose-blue`, etc.)
- Advanced plugin-generated utilities
- Prose color customization per element

**When to use this:**

- You want simple, beautiful typography without plugin complexity
- You're using Tailwind CSS v4 and prefer CSS-only solutions
- You don't need element-specific customization
- You want a smaller bundle size

## Supported HTML Elements

This library styles all standard prose elements:

- **Headings:** `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- **Text:** `p`, `strong`, `em`, `small`, `mark`, `sub`, `sup`
- **Lists:** `ul`, `ol`, `li`, `dl`, `dt`, `dd`
- **Links:** `a`
- **Code:** `code`, `pre`, `kbd`
- **Quotes:** `blockquote`, `cite`
- **Tables:** `table`, `thead`, `tbody`, `tr`, `th`, `td`
- **Media:** `img`, `figure`, `figcaption`
- **Other:** `hr`, and more

## Important Usage Notes

⚠️ **Size variants must be used with the base `prose` class:**

```html
<!-- ✅ Correct -->
<article class="prose prose-lg">Content</article>

<!-- ❌ Wrong -->
<article class="prose-lg">Content</article>
```

This follows the same pattern as the official Tailwind Typography plugin.

## License

MIT
