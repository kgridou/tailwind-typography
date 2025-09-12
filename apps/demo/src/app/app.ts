import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProseComparisonComponent } from './components/prose-comparison.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProseComparisonComponent],
  template: `
    <app-prose-comparison />
    <router-outlet />
  `,
  styles: [],
})
export class App {}
