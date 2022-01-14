import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuastionForm } from './quastion-form.component';

describe('CreatequastionComponent', () => {
  let component: QuastionForm;
  let fixture: ComponentFixture<QuastionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuastionForm ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuastionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
