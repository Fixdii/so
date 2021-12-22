import { TestBed } from '@angular/core/testing';

import { IsLoggedInGuard } from './is-logged-in.guard';

describe('IsNotLoggedInGuard', () => {
  let guard: IsLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
