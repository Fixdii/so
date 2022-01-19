import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIComment, DBQuestion, StoreObject, UIQuestion, DBUrl } from '../models';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  sendQuestion(question: DBQuestion): Observable<boolean> {
    return this.http
      .post(
        `${DBUrl}.json`,
        question
      )
      .pipe(map((res) => Boolean(res)));
  }

  getQuestions(): Observable<UIQuestion[]> {
    return this.http
      .get<StoreObject<DBQuestion>>(
        `${DBUrl}.json`
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

  approveQuestion(key: string): Observable<boolean> {
    return this.http
      .patch<StoreObject<DBQuestion>>(
        `${DBUrl}/${key}.json`,
        { approved: true }
      )
      .pipe(map((res) => Boolean(res)));
  }

  deleteQuestion(key: string): Observable<boolean> {
    return this.http
      .delete<StoreObject<DBQuestion>>(
        `${DBUrl}/${key}.json`
      )
      .pipe(map((res) => !Boolean(res)));
  }

  addComment(key: string, comment: UIComment): Observable<boolean> {
    return this.http
      .post(
        `${DBUrl}/${key}/comments.json`,
        comment
      )
      .pipe(map((res) => Boolean(res)));
  }

  deleteComment(keyQuestion: string, keyComment: string): Observable<boolean> {
    return this.http
      .delete<StoreObject<DBQuestion>>(
        `${DBUrl}/${keyQuestion}/comments/${keyComment}.json`
      )
      .pipe(map((res) => !Boolean(res)));
  }

  resolveComment(keyQuestion: string, keyComment: string, e: boolean): Observable<boolean> {
    return this.http
      .patch<StoreObject<DBQuestion>>(
        `${DBUrl}/${keyQuestion}/comments/${keyComment}.json`,
        { isResolved: e }
      )
      .pipe(map((res) => !Boolean(res)));
  }

  editQuestion(key: string, question: DBQuestion): Observable<boolean> {
    return this.http
      .patch<StoreObject<DBQuestion>>(
        `${DBUrl}/${key}.json`,
        question
      )
      .pipe(map((res) => Boolean(res)));
  }
}
