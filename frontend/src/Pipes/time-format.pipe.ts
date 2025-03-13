import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === undefined || value < 0) return '00:00:00';

    // Assuming the value is in seconds
    const totalSeconds = value;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Return time formatted as HH:mm:ss
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
