import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PATHS } from 'src/app/core/models';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, OnDestroy {
  error = '';
  activeRoute: string;
  isSignUp = false;
  private destroy = new Subject<void>();
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.activeRoute = this.activateRoute.snapshot.routeConfig.path;
  }

  ngOnInit(): void {
    this.isSignUp = this.activeRoute === PATHS.SIGN_UP;

    this.formGroup = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[[A-Za-z0-9./()^_%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
          ),
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

  submit(): void {
    const { email, password } = this.formGroup.value;
    this.error = '';
    this.handler(this.signIn(email, password));
  }

  signIn(email: string, password: string): Observable<boolean> {
    return this.isSignUp
      ? this.authService.signUp(email, password)
      : this.authService.logIn(email, password);
  }

  loginGoogle(): void {
    this.handler(this.authService.loginWithGoogle());
  }

  loginFacebook(): void {
    this.handler(this.authService.loginWithFacebook());
  }

  handler(promise: Promise<boolean> | Observable<boolean> ): void{
    if (promise instanceof Promise) {
      promise
        .then((res) => {
          if (res) {
            this.router.navigate(['']);
          }
        })
        .catch((err) => {
          this.error = err.message;
        });
    } else {
      promise.pipe(takeUntil(this.destroy)).subscribe(
        (res) => {
          if (res) {
            this.router.navigate(['']);
          }
        },
        (err) => (this.error = err.message)
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
