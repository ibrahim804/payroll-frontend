import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoanRequestComponent } from './dialog-loan-request.component';

describe('DialogLoanRequestComponent', () => {
  let component: DialogLoanRequestComponent;
  let fixture: ComponentFixture<DialogLoanRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLoanRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
