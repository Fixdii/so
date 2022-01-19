import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DBQuestion, TAGS } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuestionsService } from 'src/app/core/services/questions.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionForm implements OnInit, OnDestroy{
  TAGS = TAGS;
  formGroup: FormGroup;
  email: string;
  tags: string[] = [];
  id: string;
  isEdit: boolean;
  questionText: string;
  questionTitle: string;
  questionTags: string[] = [];
  private destroy = new Subject<void>();


  constructor(
    private fb: FormBuilder,
    private questionsService: QuestionsService,
    private router: Router,
    private authService: AuthService,
    private activateRoute: ActivatedRoute
  ) {
    if (this.activateRoute.snapshot.routeConfig.path === 'editquestion/:id') {
      this.isEdit = true;
      this.getInfoQuestion;
    }
  }

  get getInfoQuestion() {
    return this.questionsService.getQuestions()
    .pipe(takeUntil(this.destroy)).subscribe((data) => {
      data.forEach((question) => {
        if (this.id === question.id) {
          this.questionTitle = question.title;
          this.questionText = question.text;
          this.questionTags = question.tag;
          this.formGroup.patchValue({ tag: question.tag });
        }
      });
    });
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      tag: [[], [Validators.required, Validators.min(1)]],
    });

    if (this.isEdit) {
      this.activateRoute.paramMap
        .pipe(switchMap((params) => params.getAll('id')))
        .pipe(takeUntil(this.destroy))
        .subscribe((data) => (this.id = data));
    }

    this.authService.user.subscribe((res) => {
      if(res) {
        this.email = res.email;
      }      
    });
  }

  submit(): void{
    const question: DBQuestion = {
      approved: false,
      author: this.email,
      dateOfCreation: +new Date(),
      ...this.formGroup.value,
    };

    if (this.isEdit) {
      this.questionsService.editQuestion(this.id, question).pipe(takeUntil(this.destroy)).subscribe((res) => {
        if (res) {
          this.router.navigate([`/question/${this.id}`]);
        }
      });
    } else {
      this.questionsService.sendQuestion(question).pipe(takeUntil(this.destroy)).subscribe((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      });
    }
  }

  checkTag(questionTag: string): boolean {
    return !!this.questionTags.find((tag) => tag === questionTag);
  }

  addTag($event: any): void {
    this.tags = this.questionTags;

    if ($event.target.checked) {
      this.tags.push($event.target.value);
    } else {
      this.tags.forEach((value, index) => {
        if ($event.target.value === value) {
          this.tags.splice(index, 1);
        }
      });
    }

    this.formGroup.patchValue({ tag: this.tags });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
