import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { UserData, UserRole } from '../models/user.entity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  awdwaw!: boolean;

  get user() {
    return this.afAuth.authState;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.user
      .pipe(
        map((user) => {
          return !!user;
        })
      );
  }

  constructor(private afAuth: AngularFireAuth, public afs: AngularFirestore) {}


  logIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        return true;
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return this.setUserData(result.user);
      });
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
      .catch((error) => {
        alert(error);
      });
  }

  setUserData(user: firebase.User | null) {
    if (!user) {
      return this.signOut().then((r) => false);
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
    return userRef
      .set(userData, {
        merge: true,
      })
      .then((r) => true);
  }

  signOut() {
    return this.afAuth.signOut();
  }
}
