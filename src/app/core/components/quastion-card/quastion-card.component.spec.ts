import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuastionCardComponent } from './quastion-card.component';

describe('QuastionsComponent', () => {
  let component: QuastionCardComponent;
  let fixture: ComponentFixture<QuastionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuastionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuastionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
