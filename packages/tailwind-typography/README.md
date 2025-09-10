# @tailwind-typography/core

CSS-only version of Tailwind Typography plugin (v4) with all prose variants.

## Installation

```bash
npm install @tailwind-typography/core
```

## Usage

### Direct CSS Import

```css
@import "@tailwind-typography/core";
```

### HTML

```html
<link rel="stylesheet" href="./node_modules/@tailwind-typography/core/dist/typography.css" />
```

### Available Classes

- `.prose` - Default typography styling
- `.prose-sm` - Small/compact typography
- `.prose-lg` - Large typography
- `.prose-xl` - Extra large typography
- `.prose-2xl` - 2X large typography

## Features

- Complete prose styling for all HTML elements
- Multiple size variants
- Dark mode support with CSS variables
- No JavaScript required
- Compatible with Tailwind CSS v4
- Uses CSS `:where()` for low specificity

## CSS Variables

The library includes comprehensive CSS variables for theming:

- Light theme: `--tw-prose-*` variables
- Dark theme: `--tw-prose-invert-*` variables

See the source CSS for complete variable reference.
