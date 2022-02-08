import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EMPTY } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    const angularFireAuthStub = () => ({
      signInWithEmailAndPassword: (email: any, password: any) => ({}),
      createUserWithEmailAndPassword: (email: any, password: any) => ({}),
      signInWithPopup: (provider: any) => ({}),
      signOut: () => ({ then: () => ({}) }),
    });
    const angularFirestoreStub = () => ({
      doc: (arg: any) => ({
        set: () => ({ then: () => ({}) }),
        get: () => ({ pipe: () => ({}) }),
      }),
    });
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useFactory: angularFireAuthStub },
        { provide: AngularFirestore, useFactory: angularFirestoreStub },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should call authLogin when loginWithGoogle', () => {
    spyOn(service, 'authLogin').and.callFake(() => {
      return EMPTY;
    });
    service.loginWithGoogle();
    expect(service.authLogin).toHaveBeenCalled();
  });

  it('should call authLogin when loginWithFacebook', () => {
    spyOn(service, 'authLogin').and.callFake(() => {
      return EMPTY;
    });
    service.loginWithGoogle();
    expect(service.authLogin).toHaveBeenCalled();
  });

  describe('signOut', () => {
    it('makes expected calls', () => {
      const angularFireAuthStub: AngularFireAuth =
        TestBed.inject(AngularFireAuth);
      spyOn(angularFireAuthStub, 'signOut').and.callThrough();
      service.signOut();
      expect(angularFireAuthStub.signOut).toHaveBeenCalled();
    });
  });
});
