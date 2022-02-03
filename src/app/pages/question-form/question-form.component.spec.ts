import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionForm } from './question-form.component';

describe('CreatequestionComponent', () => {
  let component: QuestionForm;
  let fixture: ComponentFixture<QuestionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionForm ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
