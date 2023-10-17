import { Component } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  standalone: true,
  imports: [ChildComponent],
  selector: 'app-root',
  template: `<app-child />`,
  styles: [''],
})
export class AppComponent {}
