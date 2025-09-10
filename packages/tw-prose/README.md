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

### Publishing

The package is automatically published to npm via GitHub Actions when a new tag is created:

1. Update the version in `package.json`
2. Create and push a git tag: `git tag v0.0.2 && git push origin v0.0.2`

The GitHub Actions workflow will automatically build and publish the package to npm.

## License

MIT
