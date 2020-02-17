import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPayBackComponent } from './loan-pay-back.component';

describe('LoanPayBackComponent', () => {
  let component: LoanPayBackComponent;
  let fixture: ComponentFixture<LoanPayBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanPayBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPayBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
