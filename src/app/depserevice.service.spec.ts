import { TestBed } from '@angular/core/testing';

import { DepsereviceService } from './depserevice.service';

describe('DepsereviceService', () => {
  let service: DepsereviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepsereviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
