import { TestBed } from '@angular/core/testing';

import { ShuttleServiceService } from './shuttle-service.service';

describe('ShuttleServiceService', () => {
  let service: ShuttleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShuttleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
