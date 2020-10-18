import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingManagementScreenComponent } from './booking-management-screen.component';

describe('BookingManagementScreenComponent', () => {
  let component: BookingManagementScreenComponent;
  let fixture: ComponentFixture<BookingManagementScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingManagementScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingManagementScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
