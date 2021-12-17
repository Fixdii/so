import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isAuthUserSubj = new BehaviorSubject<boolean>(false);
  isLoginSubj = new BehaviorSubject<boolean>(false);
  userData: any;

  constructor(
    private afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });
  }

  logIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // this.ngZone.run(() => {
        //   this.router.navigate(['dashboard']);
        // });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  loginWithGoogle() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // return this.oAuthLogin(provider)
    //   .then((value) => {
    //     console.log('Sucess', value), this.router.navigateByUrl('/profile');
    //   })
    //   .catch((error) => {
    //     console.log('Something went wrong: ', error);
    //   });
  }

  //  AuthLogin(provider) {
  //   return this.afAuth.signInWithPopup(provider)
  //   .then((result) => {
  //     //  this.ngZone.run(() => {
  //     //     this.router.navigate(['dashboard']);
  //     //   })
  //     this.SetUserData(result.user);
  //   }).catch((error) => {
  //     window.alert(error)
  //   })
  // }

  // getUserData(){
  //   return this.userData;
  // }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayNames || 'Anonymous',
      photoURL: user.photoURL || 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      emailVerified: user.emailVerified 
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = null;
      // this.router.navigate(['sign-in']);
    })
  }
}
