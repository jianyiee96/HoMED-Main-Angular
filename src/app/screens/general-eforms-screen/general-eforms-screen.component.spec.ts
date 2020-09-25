import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEFormsScreenComponent } from './general-eforms-screen.component';

describe('GeneralEFormsScreenComponent', () => {
  let component: GeneralEFormsScreenComponent;
  let fixture: ComponentFixture<GeneralEFormsScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralEFormsScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEFormsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
