import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

export enum UserRole {
  'User' = 'User',
  'Admin' = 'Admin'
}

export type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  deleted: boolean;
  role: UserRole
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  get user() {
    return this.afAuth.authState
  }

  constructor(
    private afAuth: AngularFireAuth,
    public afs: AngularFirestore,
  ) {
  }

  logIn(email: string, password: string) {
    console.log(1);
    
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        return true;
      })
  }

  signIn(email: string, password: string) {
    console.log(2);

    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return this.setUserData(result.user);
      })
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.authLogin(provider)
      .then((result) => {
        return true;
      })
  }

  loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.authLogin(provider)
      .then((result) => {
        return true;
      })
  }

  authLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      //  this.ngZone.run(() => {
      //     this.router.navigate(['dashboard']);
      //   })
      return this.setUserData(result.user);
    }).catch((error) => {
      alert(error)
    })
  }

  setUserData(user: firebase.User | null) {
    if (!user) {
      return this.signOut()
        .then(r => false)
    }

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || 'Anonymous',
      photoURL: user.photoURL || 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      emailVerified: user.emailVerified,
      deleted: false,
      role: UserRole.User,
    };
    return userRef.set(userData, {
      merge: true,
    }).then(r => true)
  }

  signOut() {
    return this.afAuth.signOut();
  }
}
