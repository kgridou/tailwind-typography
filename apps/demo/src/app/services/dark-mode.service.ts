import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private _isDark = signal(false);

  isDark = this._isDark.asReadonly();

  constructor() {
    // Effect to toggle dark class on HTML element
    effect(() => {
      if (this._isDark()) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }

  toggle() {
    this._isDark.set(!this._isDark());
  }

  setDark(isDark: boolean) {
    this._isDark.set(isDark);
  }
}
