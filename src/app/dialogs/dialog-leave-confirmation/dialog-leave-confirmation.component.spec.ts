import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLeaveConfirmationComponent } from './dialog-leave-confirmation.component';

describe('DialogLeaveConfirmationComponent', () => {
  let component: DialogLeaveConfirmationComponent;
  let fixture: ComponentFixture<DialogLeaveConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLeaveConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLeaveConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
