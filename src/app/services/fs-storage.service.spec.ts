import { TestBed } from '@angular/core/testing';

import { FsStorageService } from './fs-storage.service';

describe('FsStorageService', () => {
  let service: FsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
