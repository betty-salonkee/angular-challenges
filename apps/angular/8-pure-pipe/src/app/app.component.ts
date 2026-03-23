import { Component } from '@angular/core';
import { formatNamePipe } from './format-name.pipe';

@Component({
  selector: 'app-root',
  imports: [formatNamePipe],
  template: `
    @for (person of persons; track person) {
      {{ person | formatName: $index }}
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
