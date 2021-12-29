import { TestBed } from '@angular/core/testing';

import { QuastionsService } from './quastions.service';

describe('QuastionsService', () => {
  let service: QuastionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuastionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
