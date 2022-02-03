import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { PATHS, UIComment, UIQuestion, UserRole } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuestionsService } from 'src/app/core/services/questions.service';
import firebase from 'firebase/compat/app';
import { Subject } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  ROLES = UserRole;
  id: string;
  question: UIQuestion;
  formGroup: FormGroup;
  user: firebase.User;
  isResolve: boolean;
  isDarkMode: boolean;
  EDIT_QESTION = "/" + PATHS.EDIT_QESTION;
  answerComent: any;
  answerComentKey: any;
  
  private destroy = new Subject<void>();

  userData = this.authService.userData;

  constructor(
    private activateRoute: ActivatedRoute,
    private questionsService: QuestionsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private themeService: ThemeService,
  ) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    this.activateRoute.paramMap
      .pipe(switchMap((params) => params.getAll('id')))
      .subscribe((data) => (this.id = data));

    this.formGroup = this.fb.group({
      text: ['', Validators.required],
    });

    this.getUser();
    this.getQuestion();
  }

  getQuestion(): void{
    this.questionsService
      .getQuestion(this.id)
      .pipe(takeUntil(this.destroy))
      .subscribe((question) => {
        this.question = question;
        this.getAnswer();
    });
  }

  getUser(): void{
    this.authService.user
    .pipe(takeUntil(this.destroy))
    .subscribe((data) => {
      this.user = data;
    });
  }

  getAnswer(): void{    
    this.answerComent = this.question?.comments.find(comment => comment.isResolved === true);
    this.answerComentKey = this.answerComent?.commentKey;
  }

  approveQuestion(): void {
    this.questionsService
      .approveQuestion(this.id)
      .subscribe((res) => this.getQuestion());
  }

  deleteQuestion(): void {    
    this.questionsService.deleteQuestion(this.id).subscribe((res) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }

  deleteComment(keyComment: string): void {    
    this.questionsService
      .deleteComment(this.id, keyComment)
      .subscribe((res) => {
        if (res) {          
          this.getQuestion();          
        }
      });
  }

  resolve($event: any, keyComment: string): void {
    this.isResolve = $event.target.checked;
    this.getAnswer();

    this.questionsService
      .resolveComment(this.id, keyComment, $event.target.checked)
      .subscribe(() => {
        this.getQuestion();
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
      this.getQuestion();
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
