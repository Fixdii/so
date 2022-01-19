import { Pipe, PipeTransform } from '@angular/core';
import { UIQuestion } from '../models';

@Pipe({
  name: 'dateSort'
})
export class DateSortPipe implements PipeTransform {
  transform(questions: UIQuestion[], option: boolean): UIQuestion[] {
    if(questions){
      return questions.sort((a: any, b: any) => {
        return option ? new Date(b.dateOfCreation).getTime() - new Date(a.dateOfCreation).getTime() : new Date(a.dateOfCreation).getTime() - new Date(b.dateOfCreation).getTime();
      });
    }
    return questions;
  }
}