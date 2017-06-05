import { TestBed, inject } from '@angular/core/testing';

import { S3UploadService } from './s3-upload.service';

describe('S3UploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [S3UploadService]
    });
  });

  it('should ...', inject([S3UploadService], (service: S3UploadService) => {
    expect(service).toBeTruthy();
  }));
});
