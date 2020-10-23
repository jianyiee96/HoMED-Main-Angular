import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultationScreenComponent } from './consultation-screen.component';

describe('ConsultationScreenComponent', () => {
  let component: ConsultationScreenComponent;
  let fixture: ComponentFixture<ConsultationScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
