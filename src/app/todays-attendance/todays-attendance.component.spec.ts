import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysAttendanceComponent } from './todays-attendance.component';

describe('TodaysAttendanceComponent', () => {
  let component: TodaysAttendanceComponent;
  let fixture: ComponentFixture<TodaysAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
