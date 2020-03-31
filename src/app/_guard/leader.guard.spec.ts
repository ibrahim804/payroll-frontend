import { TestBed, async, inject } from '@angular/core/testing';

import { LeaderGuard } from './leader.guard';

describe('LeaderGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaderGuard]
    });
  });

  it('should ...', inject([LeaderGuard], (guard: LeaderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
