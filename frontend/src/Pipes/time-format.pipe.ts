import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (!value || value < 0) return '00:00:00';

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = Math.floor(value % 60);

    return [hours, minutes, seconds]
      .map(unit => unit.toString().padStart(2, '0'))
      .join(':');
  }
}
