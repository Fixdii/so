import { Pipe, PipeTransform } from '@angular/core';
import { UIQuestion } from '../models';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'myQuestions',
})
export class MyQuestionsPipe implements PipeTransform {
  email: string;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((res) => {
      if(res){
        this.email = res.email;
      }
    });
  }

  transform(quastions: UIQuestion[], option: boolean): UIQuestion[] {
    return option
      ? quastions.filter((quastion) => quastion.author === this.email)
      : quastions;
  }
}
