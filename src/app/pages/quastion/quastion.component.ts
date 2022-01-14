import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { UIComment, UserRole } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuastionsService } from 'src/app/core/services/quastions.service';
import firebase from 'firebase/compat/app';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-quastion',
  templateUrl: './quastion.component.html',
  styleUrls: ['./quastion.component.scss'],
})
export class QuastionComponent implements OnInit, OnDestroy {
  ROLES = UserRole;
  id: string;
  quastion: any;
  formGroup: FormGroup;
  user: firebase.User;
  isResolve: boolean;
  private destroy = new Subject<void>();

  userData = this.authService.userData;

  constructor(
    private activateRoute: ActivatedRoute,
    private quastionsService: QuastionsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.getQuastions;
    this.getUser;
  }

  get getQuastions() {
    return this.quastionsService
      .getQuastions()
      .pipe(takeUntil(this.destroy))
      .subscribe((data) => {
        data.forEach((quastion) => {
          if (this.id === quastion.id) {
            this.quastion = quastion;
          }
        });
      });
  }

  get getUser() {
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

  approveQuestion(key: string) {
    this.quastionsService
      .approveQuestion(key)
      .subscribe((res) => this.getQuastions);
  }

  deleteQuestion(key: string) {
    this.quastionsService.deleteQuestion(key).subscribe((res) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }

  deleteComment(keyQuestion: string, keyComment: string) {
    this.quastionsService
      .deleteComment(keyQuestion, keyComment)
      .subscribe((res) => {
        if (res) {
          this.getQuastions;
        }
      });
  }

  async resolve($event: any, keyQuestion: string, keyComment: string) {
    this.isResolve = $event.target.checked;

    this.quastionsService
      .resolveComment(keyQuestion, keyComment, $event.target.checked)
      .subscribe(() => {
        this.getQuastions;
      });
  }

  submit() {
    const coment: UIComment = {
      date: +new Date(),
      author: this.user.email,
      isResolved: false,
      ...this.formGroup.value,
    };

    this.formGroup.reset();

    this.quastionsService.addComment(this.id, coment).subscribe(() => {
      this.getQuastions;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
