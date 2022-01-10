import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { from, Observable, of } from 'rxjs';
import { UserData, UserRole } from '../models/user.entity';
import { concatMap, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  get user() {
    return this.afAuth.authState
  }

  get userData() {
    return this.afAuth.authState.pipe(
      concatMap(user => {
        return this.getUserData(user)
      }),
    );
  }

  get isLoggedIn(): Observable<boolean> {
    return this.user
      .pipe(
        map((user) => {
          return Boolean(user);
        })
      );
  }

  constructor(private afAuth: AngularFireAuth, public afs: AngularFirestore) {}


  logIn(email: string, password: string) {
    return from(this.afAuth
        .signInWithEmailAndPassword(email, password)
      ).pipe(
        mergeMap(result => {
          return this.setUserData(result.user)
        })
      );
  }

  signUp(email: string, password: string) {
    return from(this.afAuth
      .createUserWithEmailAndPassword(email, password)
    ).pipe(
      mergeMap(result => {
        return this.setUserData(result.user)
      })
    );
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.authLogin(provider).then((result) => {
      return true;
    });
  }

  loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.authLogin(provider).then((result) => {
      return true;
    });
  }

  authLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        return this.setUserData(result.user);
      })
  }

  setUserData(user: firebase.User | null) {
    if (!user) {
      return from(this.signOut().then((r) => false));
    }

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: UserData = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || 'Anonymous',
      photoURL:
        user.photoURL ||
        'https://material.angular.io/assets/img/examples/shiba1.jpg',
      emailVerified: user.emailVerified,
      deleted: false,
      role: UserRole.User,
    };
    return this.getUserData(user).pipe(
      concatMap(res => {
        if (res !== null) {
          return from(userRef
            .set(userData, {
              merge: true,
            })
            .then((r) => true));
        } else {
          return of(true);
        }
      })
    )
     
  }

  signOut() {
    return this.afAuth.signOut();
  }

  getUserData(user: firebase.User | null): Observable<UserData | null> {
    if (!user) {
      return of(null);
    }

    const userRef: AngularFirestoreDocument<UserData> = this.afs.doc(
      `users/${user.uid}`
    );    

    return userRef
      .get().pipe(
        map(results => {
          return results.data();
        })
      )
  }
}
