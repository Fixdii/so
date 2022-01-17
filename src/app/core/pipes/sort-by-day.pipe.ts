import { Pipe, PipeTransform } from '@angular/core';
import { UIQuestion } from '../models';

@Pipe({
  name: 'sortByDay'
})
export class SortByDayPipe implements PipeTransform {

  transform(quastions: UIQuestion[], option: number): UIQuestion[] {
    if(quastions && option != 0){
      return quastions.filter((quastion) => {        
        return +new Date( +new Date() - +new Date(quastion.dateOfCreation)).getDate() - 1 < option;        
      })
    }
    return quastions;
  }
}