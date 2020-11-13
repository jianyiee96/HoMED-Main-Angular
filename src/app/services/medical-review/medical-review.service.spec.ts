import { TestBed } from '@angular/core/testing';

import { MedicalReviewService } from './medical-review.service';

describe('MedicalReviewService', () => {
  let service: MedicalReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
