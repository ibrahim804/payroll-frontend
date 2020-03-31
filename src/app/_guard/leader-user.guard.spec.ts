import { TestBed, async, inject } from '@angular/core/testing';

import { LeaderUserGuard } from './leader-user.guard';

describe('LeaderUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaderUserGuard]
    });
  });

  it('should ...', inject([LeaderUserGuard], (guard: LeaderUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
