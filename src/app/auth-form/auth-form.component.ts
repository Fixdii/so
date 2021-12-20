import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  formGroup: FormGroup;
  subscribers: any[] = [];
  isAuthorised: boolean = false;
  isLogin: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AuthFormComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    const { email, password } = this.formGroup.value;
    
    const method = this.isLogin 
      ? this.authService.logIn
      : this.authService.signIn;

    method(email, password)
      .then((res) => {
        if (res !== false) {
          this.closeDialog();
        }
      })
      .catch(err => { console.error(err); });
  }

  loginGoogle(){
    this.authService.loginWithGoogle();
  }
  
  loginFacebook(){
    this.authService.loginWithFacebook();
  }

  signUp() {
    this.authService.isLoginSubj.next(true);
    this.authService.isAuthUserSubj.next(true);
  }

  closeDialog() {
    this.dialogRef.close();
    this.authService.isLoginSubj.next(false);
    this.authService.isAuthUserSubj.next(false);
  }

  ngOnInit(): void {
    this.authService.isAuthUserSubj.subscribe((res) => {
      this.isAuthorised = res;
    });
    this.authService.isLoginSubj.subscribe((res) => {
      this.isLogin = res;
    });
  }
}
