import { Pipe, PipeTransform } from '@angular/core';
import { UIQuestion } from '../models';

@Pipe({
  name: 'sortByDay'
})
export class SortByDayPipe implements PipeTransform {
  transform(questions: UIQuestion[], option: number): UIQuestion[] {
    if(questions && option != 0){
      return questions.filter((question) => {        
        return +new Date( +new Date() - +new Date(question.dateOfCreation)).getDate() - 1 < option;        
      })
    }
    return questions;
  }
}