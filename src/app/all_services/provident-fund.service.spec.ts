import { TestBed } from '@angular/core/testing';

import { ProvidentFundService } from './provident-fund.service';

describe('ProvidentFundService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvidentFundService = TestBed.get(ProvidentFundService);
    expect(service).toBeTruthy();
  });
});
