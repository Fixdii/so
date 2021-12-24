import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PATHS } from 'src/app/core/models';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  error = '';
  activeRoute: string;
  isSignUp = false;

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.activeRoute = this.activateRoute.snapshot.routeConfig.path
  }

  ngOnInit(): void {
    this.isSignUp = this.activeRoute === PATHS.SIGN_UP;
    this.formGroup = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[[A-Za-z0-9./()^_%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,30}'),
        ],
      ],
    });
  }

  submit() {
    const { email, password } = this.formGroup.value;
    this.error = '';
    this.handler(this.signIn(email, password));
  }

  signIn(email: string, password: string) {
    return this.isSignUp
      ? this.authService.signUp(email, password)
      : this.authService.logIn(email, password);
  }

  loginGoogle() {
    this.handler(this.authService.loginWithGoogle());
  }

  loginFacebook() {
    this.handler(this.authService.loginWithFacebook());
  }

  handler(promise: Promise<boolean>){
    promise.then((res) => {
      if (res) {
        this.router.navigate(['']);
      }
    })
    .catch((err) => {
      this.error = err.message;
    });
  }
}
