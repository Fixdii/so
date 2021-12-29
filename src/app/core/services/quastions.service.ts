import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BDQuestion, StoreObject, UIQuestion } from '../models';


@Injectable({
  providedIn: 'root'
})
export class QuastionsService {

  constructor(private http: HttpClient) { }

  sendQuastion(question: BDQuestion) {
    this.http.post('https://so-db-82a86-default-rtdb.europe-west1.firebasedatabase.app/quastions.json', question).subscribe(res => {console.log(res);
    });       
  }

  getQuastions(): Observable<UIQuestion[]>{
    return this.http.get<StoreObject<BDQuestion>>('https://so-db-82a86-default-rtdb.europe-west1.firebasedatabase.app/quastions.json')
      .pipe(
        map(res => {
          return Object.keys(res)
            .map(key => {
              return  {
                ...res[key],
                id: key
              }
            });
        })
      )
  }

  approveQuestion(key: string): Observable<boolean> {
    return this.http.patch<StoreObject<BDQuestion>>(`https://so-db-82a86-default-rtdb.europe-west1.firebasedatabase.app/quastions/${key}`, { approve: true }).pipe(
      map(res => {
        console.log(res);

        return !!res
      })
    )
  }
}
