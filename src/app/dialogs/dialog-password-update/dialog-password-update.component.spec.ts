import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPasswordUpdateComponent } from './dialog-password-update.component';

describe('DialogPasswordUpdateComponent', () => {
  let component: DialogPasswordUpdateComponent;
  let fixture: ComponentFixture<DialogPasswordUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPasswordUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPasswordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
