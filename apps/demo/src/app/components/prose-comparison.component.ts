import { Component, signal } from '@angular/core';
import { ProseContentComponent } from './prose-content.component';
import { ProseSelectorComponent, type ProseSettings } from './prose-selector.component';

@Component({
  selector: 'app-prose-comparison',
  imports: [ProseContentComponent, ProseSelectorComponent],
  template: `
    <div [class.dark]="currentSettings().darkMode" class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div class="container mx-auto px-4 py-8">
        <header class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Typography Library Comparison
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Compare tw-prose (CSS-only) vs @tailwindcss/typography (plugin) with different sizes and themes
          </p>
        </header>

        <!-- Controls -->
        <div class="mb-8">
          <app-prose-selector (settingsChange)="updateSettings($event)" />
        </div>

        <!-- Comparison Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- tw-prose Column -->
          <div class="space-y-4">
            <div class="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
              <h2 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">
                tw-prose (CSS-only)
              </h2>
              <div class="text-sm text-blue-700 dark:text-blue-300">
                Classes: {{ getTwProseClasses() }}
              </div>
            </div>
            
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
              <app-prose-content 
                [cssClasses]="getTwProseClasses()"
              />
            </div>
          </div>

          <!-- @tailwindcss/typography Column -->
          <div class="space-y-4">
            <div class="bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg">
              <h2 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-1">
                @tailwindcss/typography (Plugin)
              </h2>
              <div class="text-sm text-green-700 dark:text-green-300">
                Classes: {{ getTailwindTypographyClasses() }}
              </div>
            </div>
            
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
              <app-prose-content 
                [cssClasses]="getTailwindTypographyClasses()"
              />
            </div>
          </div>
        </div>

        <!-- Feature Comparison Table -->
        <div class="mt-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Feature Comparison
          </h2>
          
          <div class="overflow-x-auto">
            <table class="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Feature
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    tw-prose
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    @tailwindcss/typography
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    Installation Type
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    CSS Import
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    Tailwind Plugin
                  </td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-700/50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    Bundle Size
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                    Smaller
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    Larger (more features)
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    Size Variants
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                    ✓ sm, lg, xl, 2xl
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                    ✓ sm, lg, xl, 2xl
                  </td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-700/50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    Dark Mode
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                    ✓ prose-invert
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                    ✓ Color variants
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    Element Modifiers
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                    ✗ Not available
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                    ✓ prose-headings:, prose-p:, etc.
                  </td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-700/50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    Color Themes
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                    ✗ Not available
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                    ✓ prose-red, prose-blue, etc.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProseComparisonComponent {
  private _currentSettings = signal<ProseSettings>({
    library: 'tw-prose',
    size: 'base',
    darkMode: false,
  });

  currentSettings = this._currentSettings.asReadonly();

  protected updateSettings(settings: ProseSettings) {
    this._currentSettings.set(settings);
  }

  protected getTwProseClasses(): string {
    // Static class combinations for tw-prose
    if (this.currentSettings().size === 'base' && !this.currentSettings().darkMode) return 'prose';
    if (this.currentSettings().size === 'base' && this.currentSettings().darkMode)
      return 'prose prose-invert';
    if (this.currentSettings().size === 'sm' && !this.currentSettings().darkMode)
      return 'prose prose-sm';
    if (this.currentSettings().size === 'sm' && this.currentSettings().darkMode)
      return 'prose prose-sm prose-invert';
    if (this.currentSettings().size === 'lg' && !this.currentSettings().darkMode)
      return 'prose prose-lg';
    if (this.currentSettings().size === 'lg' && this.currentSettings().darkMode)
      return 'prose prose-lg prose-invert';
    if (this.currentSettings().size === 'xl' && !this.currentSettings().darkMode)
      return 'prose prose-xl';
    if (this.currentSettings().size === 'xl' && this.currentSettings().darkMode)
      return 'prose prose-xl prose-invert';
    if (this.currentSettings().size === '2xl' && !this.currentSettings().darkMode)
      return 'prose prose-2xl';
    if (this.currentSettings().size === '2xl' && this.currentSettings().darkMode)
      return 'prose prose-2xl prose-invert';
    return 'prose';
  }

  protected getTailwindTypographyClasses(): string {
    // Static class combinations for @tailwindcss/typography
    if (this.currentSettings().size === 'base' && !this.currentSettings().darkMode)
      return 'legacy-prose';
    if (this.currentSettings().size === 'base' && this.currentSettings().darkMode)
      return 'legacy-prose legacy-prose-invert';
    if (this.currentSettings().size === 'sm' && !this.currentSettings().darkMode)
      return 'legacy-prose legacy-prose-sm';
    if (this.currentSettings().size === 'sm' && this.currentSettings().darkMode)
      return 'legacy-prose legacy-prose-sm legacy-prose-invert';
    if (this.currentSettings().size === 'lg' && !this.currentSettings().darkMode)
      return 'legacy-prose legacy-prose-lg';
    if (this.currentSettings().size === 'lg' && this.currentSettings().darkMode)
      return 'legacy-prose legacy-prose-lg legacy-prose-invert';
    if (this.currentSettings().size === 'xl' && !this.currentSettings().darkMode)
      return 'legacy-prose legacy-prose-xl';
    if (this.currentSettings().size === 'xl' && this.currentSettings().darkMode)
      return 'legacy-prose legacy-prose-xl legacy-prose-invert';
    if (this.currentSettings().size === '2xl' && !this.currentSettings().darkMode)
      return 'legacy-prose legacy-prose-2xl';
    if (this.currentSettings().size === '2xl' && this.currentSettings().darkMode)
      return 'legacy-prose legacy-prose-2xl legacy-prose-invert';
    return 'legacy-prose';
  }
}
