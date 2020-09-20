import { TestBed } from '@angular/core/testing';

import { ServicemanService } from './serviceman.service';

describe('ServicemanService', () => {
  let service: ServicemanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicemanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
