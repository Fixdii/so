import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DBQuestion, TAGS, UserData } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuastionsService } from 'src/app/core/services/quastions.service';

@Component({
  selector: 'app-createquastion',
  templateUrl: './createquastion.component.html',
  styleUrls: ['./createquastion.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
  TAGS = TAGS;
  formGroup: FormGroup;
  email: string;
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private quastionsService: QuastionsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      tag: [[], [Validators.required, Validators.min(1)]],
    });

    this.authService.user.subscribe((res) => {
      this.email = res.email;
    });
  }

  submit() {
    const question: DBQuestion = {
      approved: false,
      author: this.email,
      ...this.formGroup.value,
    };

    question.dateOfCreation = +new Date();
    this.quastionsService.sendQuastion(question).subscribe((res) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }

  addTag($event: any) {
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
}
