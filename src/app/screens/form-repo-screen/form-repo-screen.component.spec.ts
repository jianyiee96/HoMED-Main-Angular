import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRepoScreenComponent } from './form-repo-screen.component';

describe('FormRepoScreenComponent', () => {
  let component: FormRepoScreenComponent;
  let fixture: ComponentFixture<FormRepoScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRepoScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRepoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
