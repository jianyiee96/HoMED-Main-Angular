import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalReviewScreenComponent } from './medical-review-screen.component';

describe('MedicalReviewScreenComponent', () => {
  let component: MedicalReviewScreenComponent;
  let fixture: ComponentFixture<MedicalReviewScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalReviewScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalReviewScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
