import { Component } from '@angular/core';
import { TW_PROSE_VERSION } from '../constants/version';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 mt-16">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Project Info -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              TW-Prose
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              CSS-only implementation of Tailwind Typography plugin for Tailwind CSS v4.
              Provides comprehensive prose styling variants without requiring the official plugin.
            </p>
            <div class="flex space-x-4">
              <a
                href="https://github.com/gridatek/tailwind-typography"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a
                href="https://www.npmjs.com/package/tw-prose"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 7v10h6.5v-5H8v5h6.5V7H0zM20.5 7v10H24V7h-3.5zm-7 0v10h3.5v-5H19v5h1.5V7H13.5z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Features
            </h3>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>✓ CSS-only implementation</li>
              <li>✓ All prose size variants (sm, lg, xl, 2xl)</li>
              <li>✓ Dark mode support with prose-invert</li>
              <li>✓ Tailwind CSS v4 @utility directive compatible</li>
              <li>✓ Drop-in replacement for @tailwindcss/typography</li>
              <li>✓ Smaller bundle size</li>
            </ul>
          </div>

          <!-- Resources -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Resources
            </h3>
            <ul class="text-sm space-y-2">
              <li>
                <a
                  href="https://tailwindcss.com/docs/typography-plugin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Official Typography Plugin
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/blog/tailwindcss-v4-alpha"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Tailwind CSS v4 Alpha
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/tailwindlabs/tailwindcss-typography"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Typography Plugin Source
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gridatek/tailwind-typography/blob/main/docs/TYPOGRAPHY_MIGRATION.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Migration Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Created by
            <a
              href="https://github.com/gridatek"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Khalil LAGRIDA
            </a>
             • MIT License •
            <span class="inline-block">
              Built with Tailwind CSS v4 & Angular
            </span>
          </p>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
            tw-prose v{{ getPackageVersion() }} •
            Faithfully reproduces official Tailwind Typography plugin behavior
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected getPackageVersion(): string {
    return TW_PROSE_VERSION;
  }
}
