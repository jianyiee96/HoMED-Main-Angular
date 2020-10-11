import { TestBed } from '@angular/core/testing';
import { MedicalCenterService } from './medical-center.service';

describe('MedicalCenterService', () => {
  let service: MedicalCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
