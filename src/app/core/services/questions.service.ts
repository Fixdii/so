import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIComment, DBQuestion, StoreObject, UIQuestion, PATHS } from '../models';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  sendQuestion(question: DBQuestion): Observable<boolean> {
    return this.http
      .post(
        `${PATHS.DBUrl}.json`,
        question
      )
      .pipe(map((res) => Boolean(res)));
  }

  getQuestions(): Observable<UIQuestion[]> {
    return this.http
      .get<StoreObject<DBQuestion>>(
        `${PATHS.DBUrl}.json`
      )
      .pipe(
        map((res) => {
          return Object.keys(res).map((key) => {
            return {
              id: key,
              ...res[key],
              comments: Object.keys(res[key].comments || {}).map(
                (commentKey) => {
                  return {
                    ...res[key].comments[commentKey],
                    commentKey: commentKey,
                  };
                }
              ),
            };
          });
        })
      );
  }

  getQuestion(key: string): Observable<UIQuestion> {
    return this.http.get<DBQuestion>(`${PATHS.DBUrl}/${key}.json`).pipe(map((res=>{  
      return {
        ...res,
        id: key,
        comments: Object.keys(res.comments || {}).map(
          (commentKey) => {
            return {
              ...res.comments[commentKey],
              commentKey: commentKey,
            }
          }
        ),
      }; 
    })))

  }

  approveQuestion(key: string): Observable<boolean> {
    return this.http
      .patch<StoreObject<DBQuestion>>(
        `${PATHS.DBUrl}/${key}.json`,
        { approved: true }
      )
      .pipe(map((res) => Boolean(res)));
  }

  deleteQuestion(key: string): Observable<boolean> {
    return this.http
      .delete<StoreObject<DBQuestion>>(
        `${PATHS.DBUrl}/${key}.json`
      )
      .pipe(map((res) => !Boolean(res)));
  }

  addComment(key: string, comment: UIComment): Observable<boolean> {
    return this.http
      .post(
        `${PATHS.DBUrl}/${key}/comments.json`,
        comment
      )
      .pipe(map((res) => Boolean(res)));
  }

  deleteComment(keyQuestion: string, keyComment: string): Observable<boolean> {
    return this.http
      .delete<StoreObject<DBQuestion>>(
        `${PATHS.DBUrl}/${keyQuestion}/comments/${keyComment}.json`
      )
      .pipe(map((res) => !Boolean(res)));
  }

  resolveComment(keyQuestion: string, keyComment: string, e: boolean): Observable<boolean> {
    return this.http
      .patch<StoreObject<DBQuestion>>(
        `${PATHS.DBUrl}/${keyQuestion}/comments/${keyComment}.json`,
        { isResolved: e }
      )
      .pipe(map((res) => !Boolean(res)));
  }

  editQuestion(key: string, question: DBQuestion): Observable<boolean> {
    return this.http
      .patch<StoreObject<DBQuestion>>(
        `${PATHS.DBUrl}/${key}.json`,
        question
      )
      .pipe(map((res) => Boolean(res)));
  }
}
