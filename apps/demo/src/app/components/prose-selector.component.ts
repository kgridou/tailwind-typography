import { Component, output } from '@angular/core';

export type ProseSize = 'base' | 'sm' | 'lg' | 'xl' | '2xl';
export type ProseLibrary = 'tw-prose' | 'tailwind-typography';

export interface ProseSettings {
  library: ProseLibrary;
  size: ProseSize;
  darkMode: boolean;
}

@Component({
  selector: 'app-prose-selector',
  template: `
    <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Typography Settings
      </h2>

      <div class="space-y-4">
        <!-- Size Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Size Variant
          </label>
          <div class="flex flex-wrap gap-2">
            <button (click)="updateSize('base')" [class]="getSizeButtonClass('base')">Base</button>
            <button (click)="updateSize('sm')" [class]="getSizeButtonClass('sm')">Small</button>
            <button (click)="updateSize('lg')" [class]="getSizeButtonClass('lg')">Large</button>
            <button (click)="updateSize('xl')" [class]="getSizeButtonClass('xl')">XL</button>
            <button (click)="updateSize('2xl')" [class]="getSizeButtonClass('2xl')">2XL</button>
          </div>
        </div>

        <!-- Dark Mode Toggle -->
        <div>
          <label class="flex items-center cursor-pointer w-fit">
            <input
              type="checkbox"
              [checked]="settings().darkMode"
              (change)="toggleDarkMode()"
              class="mr-2"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
          </label>
        </div>

        <!-- Settings Display -->
        <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded border text-xs">
          <div class="text-gray-600 dark:text-gray-400">Current Settings:</div>
          <div class="text-gray-800 dark:text-gray-200 mt-1">
            {{ getSettingsPreview() }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProseSelectorComponent {
  settingsChange = output<ProseSettings>();

  private _settings: ProseSettings = {
    library: 'tw-prose',
    size: 'base',
    darkMode: false,
  };

  settings = () => this._settings;

  protected updateSize(size: ProseSize) {
    this._settings = { ...this._settings, size };
    this.settingsChange.emit(this._settings);
  }

  protected toggleDarkMode() {
    this._settings = { ...this._settings, darkMode: !this._settings.darkMode };
    this.settingsChange.emit(this._settings);
  }

  protected getSizeButtonClass(size: ProseSize): string {
    const baseClasses = 'px-3 py-1.5 text-sm font-medium rounded-md transition-colors border';
    const isActive = this._settings.size === size;

    if (isActive) {
      return `${baseClasses} bg-blue-600 text-white border-blue-600`;
    }
    return `${baseClasses} bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600`;
  }

  protected getSettingsPreview(): string {
    return `Library: ${this._settings.library}, Size: ${this._settings.size}, Dark: ${this._settings.darkMode}`;
  }
}
