import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentencecase',
  standalone: true
})
export class SentencecasePipe implements PipeTransform {

  transform(sentence: string): string {
    if(sentence){
      let convertedText = sentence[0].toUpperCase()+ sentence.substring(1).toLowerCase()

      return convertedText
    }else{
      return sentence
    }
  }

}
