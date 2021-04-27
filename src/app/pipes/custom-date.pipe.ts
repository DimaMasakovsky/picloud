import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: number): string {
    const months: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const d = new Date(value);
    if (d.getMinutes() < 10) {
      return `${d.getDate()} ${
        months[d.getMonth()]
      } ${d.getFullYear()} at ${d.getHours()}:0${d.getMinutes()} `;
    }
    return `${d.getDate()} ${
      months[d.getMonth()]
    } ${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()} `;
  }
}
