import { TestBed } from '@angular/core/testing';

import { PostRequestService } from './post-request.service';

describe('PostRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostRequestService = TestBed.get(PostRequestService);
    expect(service).toBeTruthy();
  });
});
