import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  imports: [ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport
      appendOnly
      itemSize="36"
      class="h-[300px] border-2 border-black">
      <div
        *cdkVirtualFor="let person of persons()"
        class="flex h-9 items-center justify-between border-b">
        <h3>{{ person.name }}</h3>
        <p>{{ person.email }}</p>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  persons = input<Person[]>();
}
