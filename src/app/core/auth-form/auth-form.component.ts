import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  formGroup!: FormGroup;
  // subscribers: any[] = [];
  // isAuthorised: boolean = false;
  isLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')],
    });
  }

  submit() {
    const { email, password } = this.formGroup.value;

    this.signIn(email, password)
      .then((res) => {
        if (res !== false) {
          // this.closeDialog();
        }
      })
      .catch(err => { console.error(err); });
  }

  signIn(email: string, password: string) {
    return this.isLogin 
      ? this.authService.signIn(email, password)
      : this.authService.logIn(email, password);
  }

  loginGoogle(){
    this.authService.loginWithGoogle();
  }
  
  loginFacebook(){
    this.authService.loginWithFacebook();
  }

  toggleForm(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.isLogin = !this.isLogin;
  }
}
