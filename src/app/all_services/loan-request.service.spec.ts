import { TestBed } from '@angular/core/testing';

import { LoanRequestService } from './loan-request.service';

describe('LoanRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanRequestService = TestBed.get(LoanRequestService);
    expect(service).toBeTruthy();
  });
});
