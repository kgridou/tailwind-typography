# tw-prose

CSS-only version of Tailwind Typography plugin for Tailwind CSS v4 with all prose variants.

## Quick Start

```bash
npm install tw-prose
```

```css
@import "tailwindcss";
@import "tw-prose";
```

Then use in your HTML:

```html
<article class="prose">
  <h1>Your content here</h1>
  <p>Beautiful typography without any JavaScript.</p>
</article>

<!-- Size variants must be used with base prose class -->
<article class="prose prose-lg">
  <h1>Larger typography</h1>
</article>
```

## Package

- **`tw-prose`** - Core CSS library with complete prose styling for Tailwind CSS v4

## Available Classes

**Base class (always required):**

- `.prose` - Default typography styling (1rem base, 1.75 line-height)

**Size variants (use with `.prose`):**

- `.prose prose-sm` - Small/compact typography (0.875rem base, 1.714 line-height)
- `.prose prose-lg` - Large typography (1.125rem base, 1.778 line-height)
- `.prose prose-xl` - Extra large typography (1.25rem base, 1.8 line-height)
- `.prose prose-2xl` - 2X large typography (1.5rem base, 1.667 line-height)

**Dark mode:**

- `.prose-invert` - Dark theme variant (or use with CSS `dark:` classes)

## Features

- ✅ **Complete prose styling** for all HTML elements
- ✅ **Multiple size variants** with proportional scaling
- ✅ **Dark mode support** with CSS variables
- ✅ **No JavaScript required** - pure CSS implementation
- ✅ **Compatible with Tailwind CSS v4** stable release
- ✅ **Low specificity** using CSS `:where()` pseudo-class
- ✅ **Semantic HTML** styling with opt-out `.not-prose` class

## What's Different from Official @tailwindcss/typography?

**✅ What this includes:**

- All core prose styling (headings, paragraphs, lists, tables, code blocks, etc.)
- Size variants: `prose-sm`, `prose-lg`, `prose-xl`, `prose-2xl`
- Dark mode support with `prose-invert`
- CSS-only approach (no plugin required)

**❌ What this doesn't include:**

- Element-specific modifiers (`prose-headings:{utility}`, `prose-p:{utility}`, etc.)
- Color variants (`prose-red`, `prose-blue`, etc.)
- Advanced plugin-generated utilities

Choose this if you want simple, lightweight typography without the full plugin overhead.

## Documentation

See the [package README](packages/tw-prose/README.md) for complete documentation and usage examples.

## Development

This is a monorepo workspace:

```bash
# Install dependencies
npm install

# Start demo server
npm run dev

# Build all packages
npm run build

# Format code
npm run format
```

## License

MIT
