import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCut'
})
export class TextCutPipe implements PipeTransform {

  transform(text:string,length:number): unknown {
    return text.split(" ").slice(0,length).join(" ");
  }

}
