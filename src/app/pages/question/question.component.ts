import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { UIComment, UserRole } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuestionsService } from 'src/app/core/services/questions.service';
import firebase from 'firebase/compat/app';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  ROLES = UserRole;
  id: string;
  question: any;
  formGroup: FormGroup;
  user: firebase.User;
  isResolve: boolean;
  private destroy = new Subject<void>();

  userData = this.authService.userData;

  constructor(
    private activateRoute: ActivatedRoute,
    private questionsService: QuestionsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.getQuestions;
    this.getUser;
  }

  get getQuestions() {
    return this.questionsService
      .getQuestions()
      .pipe(takeUntil(this.destroy))
      .subscribe((data) => {
        data.forEach((question) => {
          if (this.id === question.id) {
            this.question = question;
          }
        });
      });
  }

  get getUser() {
    return this.authService.user.subscribe((data) => {
      return this.user = data;
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

  approveQuestion(key: string): void {
    this.questionsService
      .approveQuestion(key)
      .subscribe((res) => this.getQuestions);
  }

  deleteQuestion(key: string): void {
    this.questionsService.deleteQuestion(key).subscribe((res) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }

  deleteComment(keyQuestion: string, keyComment: string): void {
    this.questionsService
      .deleteComment(keyQuestion, keyComment)
      .subscribe((res) => {
        if (res) {
          this.getQuestions;
        }
      });
  }

  resolve($event: any, keyQuestion: string, keyComment: string): void {
    this.isResolve = $event.target.checked;

    this.questionsService
      .resolveComment(keyQuestion, keyComment, $event.target.checked)
      .subscribe(() => {
        this.getQuestions;
      });
  }

  submit(): void {
    const coment: UIComment = {
      date: +new Date(),
      author: this.user.email,
      isResolved: false,
      ...this.formGroup.value,
    };

    this.formGroup.reset();

    this.questionsService.addComment(this.id, coment).subscribe(() => {
      this.getQuestions;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
