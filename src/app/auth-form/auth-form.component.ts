import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthServiceService } from '../services/auth-service.service';

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
    private authServiceService: AuthServiceService,
  ) {
    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    const email = this.formGroup.value.email;
    const password = this.formGroup.value.password;

    if (this.isAuthorised) {
      const res = this.authServiceService.signIn(email, password);      
    } else {
      this.authServiceService.logIn(email, password);
    }

    this.closeDialog();
    this.formGroup.reset();
  }

  loginGoogle(){
    this.authServiceService.loginWithGoogle();
  }

  signUp() {
    this.authServiceService.isLoginSubj.next(true);
    this.authServiceService.isAuthUserSubj.next(true);
  }

  closeDialog() {
    this.dialogRef.close();
    this.formGroup.reset();
    this.authServiceService.isLoginSubj.next(false);
    this.authServiceService.isAuthUserSubj.next(false);
  }

  ngOnInit(): void {
    this.authServiceService.isAuthUserSubj.subscribe((res) => {
      this.isAuthorised = res;
    });
    this.authServiceService.isLoginSubj.subscribe((res) => {
      this.isLogin = res;
    });
  }
}
