import { Pipe, PipeTransform } from '@angular/core';
import { UIQuestion } from '../models';

@Pipe({
  name: 'tagSort',
})
export class TagSortPipe implements PipeTransform {
  transform(questions: UIQuestion[], options: string[]): UIQuestion[] {
    if (options && options.length > 0) {
      return questions.filter((question) => {
        for (let option of options) {
          if (question.tag.includes(option)) {
            return true;
          }
        }
        return false;
      })
    }
    return questions;
  }
}
