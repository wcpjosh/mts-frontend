import { TestBed } from '@angular/core/testing';

import { AuthenticateDataService } from './authenticate-data.service';

describe('AuthenticateDataService', () => {
  let service: AuthenticateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
