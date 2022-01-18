import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DBQuestion, TAGS } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuastionsService } from 'src/app/core/services/quastions.service';

@Component({
  selector: 'app-quastion-form',
  templateUrl: './quastion-form.component.html',
  styleUrls: ['./quastion-form.component.scss'],
})
export class QuastionForm implements OnInit, OnDestroy{
  TAGS = TAGS;
  formGroup: FormGroup;
  email: string;
  tags: string[] = [];
  id: string;
  isEdit: boolean;
  quastionText: string;
  quastionTitle: string;
  quastionTags: string[] = [];
  private destroy = new Subject<void>();


  constructor(
    private fb: FormBuilder,
    private quastionsService: QuastionsService,
    private router: Router,
    private authService: AuthService,
    private activateRoute: ActivatedRoute
  ) {
    if (this.activateRoute.snapshot.routeConfig.path === 'editquastion/:id') {
      this.isEdit = true;
      this.getInfoQuastion;
    }
  }

  get getInfoQuastion() {
    return this.quastionsService.getQuastions()
    .pipe(takeUntil(this.destroy)).subscribe((data) => {
      data.forEach((quastion) => {
        if (this.id === quastion.id) {
          this.quastionTitle = quastion.title;
          this.quastionText = quastion.text;
          this.quastionTags = quastion.tag;
          this.formGroup.patchValue({ tag: quastion.tag });
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

  submit() {
    const question: DBQuestion = {
      approved: false,
      author: this.email,
      dateOfCreation: +new Date(),
      ...this.formGroup.value,
    };

    if (this.isEdit) {
      this.quastionsService.editQuestion(this.id, question).pipe(takeUntil(this.destroy)).subscribe((res) => {
        if (res) {
          this.router.navigate([`/quastion/${this.id}`]);
        }
      });
    } else {
      this.quastionsService.sendQuastion(question).pipe(takeUntil(this.destroy)).subscribe((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      });
    }
  }

  checkTag(quastionTag: string): boolean {
    return !!this.quastionTags.find((tag) => tag === quastionTag);
  }

  addTag($event: any) {
    this.tags = this.quastionTags;

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
