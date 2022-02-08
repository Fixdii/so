import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { QuestionsService } from '../../services/questions.service';
import { UserRole } from '../../models';
import { PATHS } from '../../models';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionCardComponent } from './question-card.component';

describe('QuestionCardComponent', () => {
  let component: QuestionCardComponent;
  let fixture: ComponentFixture<QuestionCardComponent>;

  beforeEach(() => {
    const authServiceStub = () => ({});
    const questionsServiceStub = () => ({
      approveQuestion: (key: any) => ({ pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) }),
      deleteQuestion: (key: any) => ({ pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) })
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [QuestionCardComponent],
      providers: [
        { provide: AuthService, useFactory: authServiceStub },
        { provide: QuestionsService, useFactory: questionsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(QuestionCardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`toggle has default value`, () => {
    expect(component.toggle).toEqual(false);
  });

  it(`ROLES has default value`, () => {
    expect(component.ROLES).toEqual(UserRole);
  });

  it(`PATHS has default value`, () => {
    expect(component.PATHS).toEqual(PATHS);
  });

  it(`approveQuestion output value by event emitter`,() => {
    let result = null;
    component.onChanged.subscribe(value => result = value);
    component.approveQuestion('key');
    expect(result).toEqual([]);
  })

  it(`deleteQuestion output value by event emitter`,() => {
    let result = null;
    component.onChanged.subscribe(value => result = value);
    component.deleteQuestion('key');
    expect(result).toEqual([]);
  })
});