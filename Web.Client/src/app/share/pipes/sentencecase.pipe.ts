import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentencecase',
})
export class SentencecasePipe implements PipeTransform {
  transform(text: string): string {
    const words = text.split(' ').map((word, idx) => {
      return idx === 0
        ? word[0].toLocaleUpperCase() +
            word.slice(1, word.length).toLocaleLowerCase()
        : word.toLocaleLowerCase();
    });

    return words.join(' ');
  }
}
