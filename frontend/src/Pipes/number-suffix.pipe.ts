import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'numberSuffix'
})
export class NumberSuffixPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 1_000_000) return Math.round(value).toString(); // En dessous de 1M, afficher normalement

    const suffixes = ['Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion'];
    let suffixIndex = 0;
    let num = value / 1_000_000;

    while (num >= 1000 && suffixIndex < suffixes.length - 1) {
      num /= 1000;
      suffixIndex++;
    }

    return `<span style="font-size: 1.2em;">${Math.round(num)}</span> <span style="font-size: 0.6em;">${suffixes[suffixIndex]}</span>`;
  }
}
