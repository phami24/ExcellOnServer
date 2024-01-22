import { TestBed } from '@angular/core/testing';

import { AlertSuccessService } from './alert-success.service';

describe('AlertSuccessService', () => {
  let service: AlertSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
