import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProseComparisonComponent } from './components/prose-comparison.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProseComparisonComponent, FooterComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-prose-comparison />
    <app-footer />
    <router-outlet />
  `,
  styles: [],
})
export class App {}
