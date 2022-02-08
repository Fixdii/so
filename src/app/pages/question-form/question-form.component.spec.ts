import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuestionsService } from 'src/app/core/services/questions.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { TAGS } from 'src/app/core/models';
import { PATHS } from 'src/app/core/models';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionForm } from './question-form.component';
import { EMPTY } from 'rxjs';

describe('QuestionForm', () => {
  let component: QuestionForm;
  let fixture: ComponentFixture<QuestionForm>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: (object: any) => ({}) });
    const activatedRouteStub = () => ({
      snapshot: { routeConfig: { path: {} }, params: { id: {} } }
    });
    const routerStub = () => ({ navigate: (array: any) => ({}) });
    const authServiceStub = () => ({ user: { subscribe: (f: (arg0: {}) => any) => f({}) } });
    const questionsServiceStub = () => ({
      getQuestion: (id: any) => ({ pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) }),
      editQuestion: (id: any, question: any) => ({
        pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
      }),
      sendQuestion: (question: any) => ({ pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) })
    });
    const themeServiceStub = () => ({
      initTheme: () => ({}),
      isDarkMode: () => ({})
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [QuestionForm],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: QuestionsService, useFactory: questionsServiceStub },
        { provide: ThemeService, useFactory: themeServiceStub }
      ]
    });
    fixture = TestBed.createComponent(QuestionForm);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`TAGS has default value`, () => {
    expect(component.TAGS).toEqual(TAGS);
  });

  it(`PATHS has default value`, () => {
    expect(component.PATHS).toEqual(PATHS);
  });
  
  describe('getInfoQuestion', () => {
    it('makes expected calls', () => {
      const questionsServiceStub: QuestionsService = fixture.debugElement.injector.get(
        QuestionsService
      );
      spyOn(questionsServiceStub, 'getQuestion').and.callFake(() => {
        return EMPTY;
      });
      component.getInfoQuestion();
      expect(questionsServiceStub.getQuestion).toHaveBeenCalled();
    });
  });
});
