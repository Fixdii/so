import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UIComment } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuastionsService } from 'src/app/core/services/quastions.service';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-quastion',
  templateUrl: './quastion.component.html',
  styleUrls: ['./quastion.component.scss'],
})
export class QuastionComponent implements OnInit {
  id: string;
  quastion: any;
  formGroup: FormGroup;
  user: firebase.User;

  constructor(
    private activateRoute: ActivatedRoute,
    private quastionsService: QuastionsService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.getQuastions;
    this.getUser;
  }

  get getQuastions() {
    return this.quastionsService.getQuastions().subscribe((data) => {
      data.forEach((quastion) => {
        if (this.id === quastion.id) {
          this.quastion = quastion;
        }
      });
    });
  }

  get getUser(){
    return this.authService.user.subscribe((data) => {
      this.user = data;     
    });
  }

  ngOnInit(): void {
    this.activateRoute.paramMap
      .pipe(switchMap((params) => params.getAll('id')))
      .subscribe((data) => (this.id = data));

    this.formGroup = this.fb.group({
      text: ['', Validators.required],
    });
  }

  submit() {
    const coment: UIComment = {
      date: +new Date(),
      author: this.user.email,
      ...this.formGroup.value,
    };

    this.formGroup.reset();

    this.quastionsService.addComment(this.id,coment).subscribe(() => {
      this.getQuastions;
    });
  }
}