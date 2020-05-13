import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPayLoanComponent } from './dialog-pay-loan.component';

describe('DialogPayLoanComponent', () => {
  let component: DialogPayLoanComponent;
  let fixture: ComponentFixture<DialogPayLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPayLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPayLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
