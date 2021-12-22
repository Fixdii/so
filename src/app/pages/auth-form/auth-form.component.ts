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
  formGroup!: FormGroup;
  @Input() isSignUp: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  //Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    const { email, password } = this.formGroup.value;

    this.signIn(email, password)
      .then((res) => {
        if (res !== false) {
          this.router.navigate(['']);
        }
      })
      .catch(err => { console.error(err); });
  }

  signIn(email: string, password: string) {
    return this.isSignUp 
      ? this.authService.signUp(email, password)
      : this.authService.logIn(email, password);
  }

  loginGoogle(){
    this.authService.loginWithGoogle();
  }

  loginFacebook(){
    this.authService.loginWithFacebook();
  }
}
