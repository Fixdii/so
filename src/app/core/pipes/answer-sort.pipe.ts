import { Pipe, PipeTransform } from '@angular/core';
import { UIQuestion } from '../models';

@Pipe({
  name: 'answerSort'
})
export class AnswerSortPipe implements PipeTransform {
  transform(questions: UIQuestion[], options: string): UIQuestion[] {    
    if (options === 'true') {
      return questions.filter((question) => {      
        for(let comment of question.comments){
          if(comment.isResolved === true){
            return true;
          }
        }
        return false;
      })
    }else if (options === 'false'){
       return questions.filter((question) => {      
        for(let comment of question.comments){
          if(comment.isResolved === true){
            return false;
          }
        }
        return true;
      })
    }
    return questions;
  }

}
