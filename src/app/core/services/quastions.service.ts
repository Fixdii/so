import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIComment, DBQuestion, StoreObject, UIQuestion } from '../models';


@Injectable({
  providedIn: 'root'
})
export class QuastionsService {

  constructor(private http: HttpClient) { }

  sendQuastion(question: DBQuestion) {
    return this.http.post('https://so-db-82a86-default-rtdb.europe-west1.firebasedatabase.app/quastions.json', question)
    .pipe(map(res => Boolean(res)));  
  }

  getQuastions(): Observable<UIQuestion[]>{
    return this.http.get<StoreObject<DBQuestion>>('https://so-db-82a86-default-rtdb.europe-west1.firebasedatabase.app/quastions.json')
      .pipe(
        map(res => {          
          return Object.keys(res)
            .map(key => {              
              return  {
                id: key,
                dateOfCreation: res[key].dateOfCreation,
                tag: res[key].tag,
                text: res[key].text,
                title: res[key].title,
                approved: res[key].approved,
                author: res[key].author,
                comments: Object.keys(res[key].comments || {})
                .map(commentKey => {
                  return res[key].comments[commentKey];                
                }),
              }
            });
        })
      )
  }

  approveQuestion(key: string){      
    return this.http.patch<StoreObject<DBQuestion>>(`https://so-db-82a86-default-rtdb.europe-west1.firebasedatabase.app/quastions/${key}.json`, { approved: true })
    .pipe(map(res => Boolean(res)));   
  }

  deleteQuestion(key: string){
    return this.http.delete<StoreObject<DBQuestion>>(`https://so-db-82a86-default-rtdb.europe-west1.firebasedatabase.app/quastions/${key}.json`)
    .pipe(map(res => !Boolean(res)));  
  }

  addComment(key: string,comment: UIComment){
    return this.http.post(`https://so-db-82a86-default-rtdb.europe-west1.firebasedatabase.app/quastions/${key}/comments.json`, comment)
    .pipe(map(res => Boolean(res)));  
  }
  
}
