# tailwind-typography

CSS-only version of Tailwind Typography plugin for Tailwind CSS v4 with all prose variants.

## Installation

```bash
npm install tailwind-typography
```

## Usage

### With Tailwind CSS v4

```css
@import "tailwindcss";
@import "tailwind-typography";
```

### Direct CSS Import

```css
@import "tailwind-typography/index.css";
```

### HTML Link

```html
<link rel="stylesheet" href="./node_modules/tailwind-typography/index.css" />
```

### With Vite and Tailwind CSS v4

```js
// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

```css
/* main.css */
@import "tailwindcss";
@import "tailwind-typography";
```

## Available Classes

- `.prose` - Default typography styling (1rem base, 1.75 line-height)
- `.prose-sm` - Small/compact typography (0.875rem base, 1.714 line-height)
- `.prose-lg` - Large typography (1.125rem base, 1.778 line-height)
- `.prose-xl` - Extra large typography (1.25rem base, 1.8 line-height)
- `.prose-2xl` - 2X large typography (1.5rem base, 1.667 line-height)

## Features

- ✅ **Complete prose styling** for all HTML elements
- ✅ **Multiple size variants** with proportional scaling
- ✅ **Dark mode support** with CSS variables
- ✅ **No JavaScript required** - pure CSS implementation
- ✅ **Compatible with Tailwind CSS v4** stable release
- ✅ **Low specificity** using CSS `:where()` pseudo-class
- ✅ **Semantic HTML** styling with opt-out `.not-prose` class

## Styled Elements

### Typography

- Headings (`h1` through `h4`)
- Paragraphs and lead text
- Links with hover states
- Strong and emphasis text

### Lists

- Ordered lists with multiple types (decimal, alpha, roman)
- Unordered lists with proper nesting
- Definition lists

### Code

- Inline code with backticks
- Code blocks with syntax highlighting support
- Keyboard input styling

### Media

- Images and figures with captions
- Videos and pictures
- Responsive media handling

### Tables

- Complete table styling
- Header and body distinction
- Proper spacing and borders

### Other Elements

- Blockquotes with attribution
- Horizontal rules
- Custom elements support

## CSS Variables

The library includes comprehensive CSS variables for theming:

### Light Theme Variables

```css
--tw-prose-body: #374151;
--tw-prose-headings: #111827;
--tw-prose-lead: #4b5563;
--tw-prose-links: #111827;
--tw-prose-bold: #111827;
--tw-prose-code: #111827;
/* ... and many more */
```

### Dark Theme Variables

```css
--tw-prose-invert-body: #d1d5db;
--tw-prose-invert-headings: #fff;
--tw-prose-invert-lead: #9ca3af;
--tw-prose-invert-links: #fff;
--tw-prose-invert-bold: #fff;
--tw-prose-invert-code: #fff;
/* ... and many more */
```

## Browser Support

- All modern browsers supporting CSS `:where()` pseudo-class
- Chrome 88+, Firefox 78+, Safari 14+
- Progressive enhancement for older browsers

## Development

This package is part of a monorepo workspace structure:

```
tailwind-typography/
├── packages/
│   └── tailwind-typography/    # This package
├── apps/
│   └── demo/                  # Demo application
└── package.json              # Workspace root
```

### Local Development

```bash
# Install dependencies
npm install

# Start demo server
npm run dev

# Build package
npm run build --workspace=packages/tw-prose
```

### Publishing

The package is automatically published to npm via GitHub Actions when a new tag is created:

1. Update the version in `package.json`
2. Create and push a git tag: `git tag v0.0.2 && git push origin v0.0.2`

The GitHub Actions workflow will automatically build and publish the package to npm.

## License

MIT
