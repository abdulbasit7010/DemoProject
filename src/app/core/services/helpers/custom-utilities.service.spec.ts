import { TestBed } from '@angular/core/testing';

import { CustomUtilitiesService } from './custom-utilities.service';

describe('CustomUtilitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomUtilitiesService = TestBed.get(CustomUtilitiesService);
    expect(service).toBeTruthy();
  });
});
