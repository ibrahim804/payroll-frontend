import { TestBed, async, inject } from '@angular/core/testing';

import { AdminLeaderGuard } from './admin-leader.guard';

describe('AdminLeaderGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminLeaderGuard]
    });
  });

  it('should ...', inject([AdminLeaderGuard], (guard: AdminLeaderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
