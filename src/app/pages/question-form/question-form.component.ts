import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DBQuestion, PATHS, TAGS } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuestionsService } from 'src/app/core/services/questions.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionForm implements OnInit, OnDestroy{
  TAGS = TAGS;
  PATHS = PATHS;
  formGroup: FormGroup;
  email: string;
  id: string;
  isEdit: boolean;
  isDarkMode: boolean;
  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private questionsService: QuestionsService,
    private router: Router,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private themeService: ThemeService,
  ) {

    if (this.activateRoute.snapshot.routeConfig.path === `${PATHS.EDIT_QESTION}/:id`) {
      this.isEdit = true;
    }

    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  getInfoQuestion() {    
   this.questionsService.getQuestion(this.id)
    .pipe(takeUntil(this.destroy)).subscribe((question) => {      
          this.formGroup.patchValue({ tag: question.tag, title: question.title, text: question.text });
    });
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      tag: [[], [Validators.required, Validators.min(1)]],
    });

    if (this.isEdit) {
      this.id = this.activateRoute.snapshot.params.id;
      this.getInfoQuestion();
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
          this.router.navigate([`/${PATHS.QUESTION}/${this.id}`]);
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

  checkTag(tag: string): boolean {
    return this.formGroup && (this.formGroup.controls.tag.value || []).includes(tag);
  }

  addTag(tag: string): void {
    const tagsControl = this.formGroup.controls.tag;
    const tags: string[] = tagsControl.value;

    if (!this.checkTag(tag)) {
      tags.push(tag);
    } else {
      tags.forEach((value, index) => {
        if (tag === value) {
          tags.splice(index, 1);
        }
      });
    }

    tagsControl.patchValue(tags);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
