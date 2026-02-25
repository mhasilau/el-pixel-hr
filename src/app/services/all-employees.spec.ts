import { TestBed } from '@angular/core/testing';

import { AllEmployees } from './all-employees';

describe('AllEmployees', () => {
  let service: AllEmployees;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllEmployees);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
