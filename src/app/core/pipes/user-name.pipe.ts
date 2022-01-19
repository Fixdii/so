import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {
  transform(email: string): string {
    return email.split('@')[0];
  }

}
