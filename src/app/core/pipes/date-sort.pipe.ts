import { Pipe, PipeTransform } from '@angular/core';
import { DBQuestion, UIQuestion } from '../models';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'dateSort'
})
export class DateSortPipe implements PipeTransform {

  transform(quastions: UIQuestion[], option: boolean): UIQuestion[] {
    if(quastions){
      return quastions.sort((a: any, b: any) => {
        return option ? new Date(b.dateOfCreation).getTime() - new Date(a.dateOfCreation).getTime() : new Date(a.dateOfCreation).getTime() - new Date(b.dateOfCreation).getTime();
      });
    }
    return quastions;
  }
}