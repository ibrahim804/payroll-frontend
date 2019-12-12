import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLoanRequestComponent } from './apply-loan-request.component';

describe('ApplyLoanRequestComponent', () => {
  let component: ApplyLoanRequestComponent;
  let fixture: ComponentFixture<ApplyLoanRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyLoanRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
