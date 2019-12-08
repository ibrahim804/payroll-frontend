import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLeaveDetailsComponent } from './dialog-leave-details.component';

describe('DialogLeaveDetailsComponent', () => {
  let component: DialogLeaveDetailsComponent;
  let fixture: ComponentFixture<DialogLeaveDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLeaveDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLeaveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
