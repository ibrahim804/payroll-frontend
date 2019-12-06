import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSalaryDetailsComponent } from './dialog-salary-details.component';

describe('DialogSalaryDetailsComponent', () => {
  let component: DialogSalaryDetailsComponent;
  let fixture: ComponentFixture<DialogSalaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSalaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSalaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
