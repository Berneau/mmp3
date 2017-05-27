import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { PostitService } from './postit.service';

describe('PostitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostitService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  it('should ...', inject([PostitService], (service: PostitService) => {
    expect(service).toBeTruthy();
  }));
});
