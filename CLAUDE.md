# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CSS-only implementation of the Tailwind Typography plugin for Tailwind CSS v4. It provides comprehensive prose styling variants (`.prose`, `.prose-sm`, `.prose-lg`, `.prose-xl`, `.prose-2xl`) without requiring the official Tailwind plugin.

## Commands

### Development

- `npm install` - Install all workspace dependencies
- `npm run dev` - Start the demo app development server
- `npm run build` - Build all packages and apps
- `npm run format` - Format all files with Prettier

### Package Management

- `npm run build --workspace=packages/tw-prose` - Build only the core library
- `npm run dev --workspace=apps/demo` - Start only the demo app

### Code Formatting

- Git pre-commit hook automatically runs `npx lint-staged` which formats staged files with Prettier
- `npm run prepare` - Set up Husky git hooks

## Project Structure

### Workspace Layout

- `packages/tw-prose/` - Core CSS library package (`tw-prose`)
- `apps/demo/` - Demo application showcasing all typography variants
- `package.json` - Workspace root configuration
- `.husky/` - Git hooks for code formatting

### Key Files

- `packages/tw-prose/src/index.css` - Source CSS file with all prose styling variants
- `packages/tw-prose/dist/index.css` - Built/published CSS file
- `apps/demo/index.html` - Demo page showcasing all typography sizes
- `apps/demo/src/main.css` - Demo app styles that import the core library

### Reference Files

- `tailwind-v4-variables.md` - Complete reference of Tailwind CSS v4 variables (colors, spacing, typography, etc.)

## Code Architecture

### CSS Structure

The `index.css` file (872 lines) is organized using Tailwind v4's `@utility` directive as follows:

1. **Base Prose Utility** (lines 8-627) - `@utility prose` with comprehensive styling for:
   - CSS custom properties for light/dark theme variables (lines 10-47)
   - Typography elements (headings, paragraphs, links, lists, etc.)
   - Code blocks and inline code with syntax highlighting support
   - Tables, figures, and interactive elements
   - Block quotes, definition lists, and semantic HTML elements

2. **Size Variants** - Each implemented using `@utility` directive:
   - `@utility prose-sm` (lines 628-683) - Compact typography (0.875rem base)
   - `@utility prose-lg` (lines 684-739) - Large typography (1.125rem base)
   - `@utility prose-xl` (lines 740-795) - Extra large typography (1.25rem base)
   - `@utility prose-2xl` (lines 796-852) - 2X large typography (1.5rem base)

3. **Dark Mode Support** (lines 853-872) - `@utility prose-invert` that switches CSS variables for dark themes

### Styling Approach

- Uses CSS `:where()` pseudo-class with `not-prose` exclusions
- Maintains semantic HTML styling while providing opt-out mechanisms
- All measurements use relative units (em) for scalability
- Follows Tailwind's design system principles

### Development Notes

- **Monorepo Structure**: Uses npm workspaces with `packages/*` and `apps/*` pattern
- **Core Library Build**: Simple Node.js script copies `index.css` to `dist/index.css` for publishing
- **Demo App**: Vite-powered with Tailwind CSS v4 via `@tailwindcss/vite` plugin integration
- **Code Quality**: Husky pre-commit hooks run `lint-staged` for automatic Prettier formatting
- **Styling Architecture**: Uses Tailwind v4's `@utility` directive instead of traditional CSS classes
- **Theme System**: Leverages CSS custom properties with Tailwind v4 color variables (--color-gray-\*)
- **Package Dependencies**: Demo app uses local file dependency (`file:../../packages/tw-prose`)

### Build Process

- **Library**: `npm run build --workspace=packages/tw-prose` copies source to dist folder
- **Demo**: Standard Vite build process with Tailwind v4 processing
- **Publishing**: `prepublishOnly` script ensures dist folder exists before npm publish

# important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
