import { TestBed } from '@angular/core/testing';
import { MedicalCentreService } from './medical-center.service';

describe('MedicalCenterService', () => {
  let service: MedicalCentreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalCentreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
