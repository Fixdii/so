import { Pipe, PipeTransform } from '@angular/core';
import { UIQuestion, UserData } from '../models';

@Pipe({
  name: 'myQuestions',
})
export class MyQuestionsPipe implements PipeTransform {
  transform(questions: UIQuestion[], option: boolean, user: UserData): UIQuestion[] {
    return option
      ? questions.filter((question) => question.author === user.email)
      : questions;
  }
}
