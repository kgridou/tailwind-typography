# TW-Prose Demo

A comparison demo application showcasing the differences between **tw-prose** (CSS-only) and **@tailwindcss/typography** (plugin-based) typography libraries in Angular 20.2.

## 🚀 Features

- Side-by-side comparison of tw-prose vs @tailwindcss/typography
- Interactive controls for size variants (base, sm, lg, xl, 2xl)
- Dark mode toggle with live preview
- Comprehensive typography test content
- Feature comparison table
- Responsive design with Tailwind CSS v4

## 🛠️ Tech Stack

- **Angular 20.2** - Standalone components with signals
- **Tailwind CSS v4** - Latest CSS framework
- **tw-prose** - CSS-only typography library
- **@tailwindcss/typography** - Official Tailwind typography plugin
- **TypeScript** - Strict mode enabled
- **Zoneless Change Detection** - Better performance

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 🚀 Deployment to Cloudflare Pages

This project includes automatic deployment to Cloudflare Pages via GitHub Actions.

### Setup Requirements

1. **Create a Cloudflare Pages project:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages → Create a project
   - Choose "Direct Upload" or connect your GitHub repository
   - Set project name to `tw-prose-demo`

2. **Get your Cloudflare credentials:**
   - **API Token:** Go to "My Profile" → "API Tokens" → "Create Token"
     - Use "Custom token" template
     - Permissions: `Cloudflare Pages:Edit`, `Account:Read`, `Zone:Read`
   - **Account ID:** Found in the right sidebar of your Cloudflare dashboard

3. **Configure GitHub Secrets:**
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
     - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### Deployment Process

The deployment happens automatically:

- **On push to `main` branch:** Deploys to production
- **On pull request:** Creates preview deployment

### Build Configuration

- **Build command:** `npm run build`
- **Build output directory:** `dist/tw-prose-demo/browser`
- **Node.js version:** 20

## 🏗️ Typography Libraries Comparison

| Feature           | tw-prose          | @tailwindcss/typography           |
| ----------------- | ----------------- | --------------------------------- |
| Installation      | CSS Import        | Tailwind Plugin                   |
| Bundle Size       | Smaller           | Larger (more features)            |
| Size Variants     | ✓ sm, lg, xl, 2xl | ✓ sm, lg, xl, 2xl                 |
| Dark Mode         | ✓ prose-invert    | ✓ Color variants                  |
| Element Modifiers | ✗ Not available   | ✓ prose-headings:, prose-p:, etc. |
| Color Themes      | ✗ Not available   | ✓ prose-red, prose-blue, etc.     |

### Class Names

- **tw-prose:** `prose`, `prose-sm`, `prose-lg`, `prose-xl`, `prose-2xl`, `prose-invert`
- **@tailwindcss/typography:** `legacy-prose`, `legacy-prose-sm`, `legacy-prose-lg`, `legacy-prose-xl`, `legacy-prose-2xl`, `legacy-prose-invert`

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
