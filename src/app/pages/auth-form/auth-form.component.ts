import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  error: string = '';

  formGroup!: FormGroup;

  @Input() isSignUp: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('((?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'),
        ],
      ],
    });

    console.log(this.formGroup.get('email'));
  }

  submit() {
    const { email, password } = this.formGroup.value;
    this.error = '';
    this.signIn(email, password)
      .then((res) => {
        if (res !== false) {
          this.router.navigate(['']);
        }
      })
      .catch((err) => {
        this.error = err.message;
      });
  }

  signIn(email: string, password: string) {
    return this.isSignUp
      ? this.authService.signUp(email, password)
      : this.authService.logIn(email, password);
  }

  loginGoogle() {
    this.authService
      .loginWithGoogle()
      .then((res) => {
        if (res !== false) {
          this.router.navigate(['']);
        }
      })
      .catch((err) => {
        this.error = err.message;
      });
  }

  loginFacebook() {
    this.authService
      .loginWithFacebook()
      .then((res) => {
        if (res !== false) {
          this.router.navigate(['']);
        }
      })
      .catch((err) => {
        this.error = err.message;
      });
  }
}
