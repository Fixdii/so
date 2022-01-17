import { Pipe, PipeTransform } from '@angular/core';
import { UIQuestion } from '../models';

@Pipe({
  name: 'tagSort',
})
export class TagSortPipe implements PipeTransform {
  transform(quastions: UIQuestion[], options: string[]): UIQuestion[] {
    if (options && options.length > 0) {
      return quastions.filter((quastion) => {
        for (let option of options) {
          if (quastion.tag.includes(option)) {
            return true;
          }
        }
        return false;
      })
    }
    return quastions;
  }
}
