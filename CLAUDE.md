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

- `npm run build --workspace=packages/tailwind-typography` - Build only the core library
- `npm run dev --workspace=apps/demo` - Start only the demo app

### Code Formatting

- Git pre-commit hook automatically runs `npx lint-staged` which formats staged files with Prettier
- `npm run prepare` - Set up Husky git hooks

## Project Structure

### Workspace Layout

- `packages/tailwind-typography/` - Core CSS library package (`@tailwind-typography/core`)
- `apps/demo/` - Demo application showcasing all typography variants
- `package.json` - Workspace root configuration
- `.husky/` - Git hooks for code formatting

### Key Files

- `packages/tailwind-typography/src/index.css` - Source CSS file with all prose styling variants
- `packages/tailwind-typography/dist/index.css` - Built/published CSS file
- `apps/demo/index.html` - Demo page showcasing all typography sizes
- `apps/demo/src/main.css` - Demo app styles that import the core library

### Reference Files

- `tailwind-v4-variables.md` - Complete reference of Tailwind CSS v4 variables (colors, spacing, typography, etc.)

## Code Architecture

### CSS Structure

The `index.css` file is organized as follows:

1. **Base Prose Styles** (lines 1-490) - Default `.prose` class with comprehensive styling for:
   - Typography elements (headings, paragraphs, links, etc.)
   - Lists (ordered/unordered with various type attributes)
   - Code blocks and inline code
   - Tables and figures
   - Block quotes and definition lists

2. **CSS Variables** (lines 451-490) - Complete set of theme variables for both light and dark modes:
   - `--tw-prose-*` variables for light theme
   - `--tw-prose-invert-*` variables for dark theme

3. **Size Variants** - Each size variant (sm, lg, xl, 2xl) includes:
   - Font size and line height adjustments
   - Proportional spacing modifications
   - Element-specific overrides

### Styling Approach

- Uses CSS `:where()` pseudo-class with `not-prose` exclusions
- Maintains semantic HTML styling while providing opt-out mechanisms
- All measurements use relative units (em) for scalability
- Follows Tailwind's design system principles

### Development Notes

- Monorepo structure using npm workspaces
- Core library in `packages/tailwind-typography` with simple build step (copy src to dist)
- Demo app uses Vite with Tailwind CSS v4 integration via `@tailwindcss/vite` plugin
- The project uses Husky for git hooks with lint-staged for automatic formatting
- Prettier configuration is minimal (empty object in `.prettierrc`)
- Core typography library is pure CSS, demo app showcases integration with Tailwind v4
