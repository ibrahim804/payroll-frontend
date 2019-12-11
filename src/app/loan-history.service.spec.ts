import { TestBed } from '@angular/core/testing';

import { LoanHistoryService } from './loan-history.service';

describe('LoanHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanHistoryService = TestBed.get(LoanHistoryService);
    expect(service).toBeTruthy();
  });
});
