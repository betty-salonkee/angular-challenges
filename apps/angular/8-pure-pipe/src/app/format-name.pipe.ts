import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName',
  standalone: true,
})
export class formatNamePipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
