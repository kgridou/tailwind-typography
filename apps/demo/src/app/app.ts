import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProseComparisonComponent } from './components/prose-comparison.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProseComparisonComponent, FooterComponent],
  template: `
    <app-prose-comparison />
    <app-footer />
    <router-outlet />
  `,
  styles: [],
})
export class App {}
