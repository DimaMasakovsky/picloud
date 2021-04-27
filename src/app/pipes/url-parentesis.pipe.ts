import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlParentesis',
})
export class UrlParentesisPipe implements PipeTransform {
  transform(value: string): unknown {
    return `url(${value})`;
  }
}
