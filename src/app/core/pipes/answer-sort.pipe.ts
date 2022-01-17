import { Pipe, PipeTransform } from '@angular/core';
import { UIQuestion } from '../models';

@Pipe({
  name: 'answerSort'
})
export class AnswerSortPipe implements PipeTransform {

  transform(quastions: UIQuestion[], options: string): UIQuestion[] {    
    if (options === 'true') {
      return quastions.filter((quastion) => {      
        for(let comment of quastion.comments){
          if(comment.isResolved === true){
            return true;
          }
        }
        return false;
      })
    }else if (options === 'false'){
       return quastions.filter((quastion) => {      
        for(let comment of quastion.comments){
          if(comment.isResolved === true){
            return false;
          }
        }
        return true;
      })
    }
    return quastions;
  }

}
