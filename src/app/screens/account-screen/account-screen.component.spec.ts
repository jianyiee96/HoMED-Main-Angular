import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountScreenComponent } from './account-screen.component';

describe('AccountScreenComponent', () => {
  let component: AccountScreenComponent;
  let fixture: ComponentFixture<AccountScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
