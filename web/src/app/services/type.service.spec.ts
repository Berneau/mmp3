import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TypeService } from './type.service';

describe('TypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TypeService,
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

  it('should ...', inject([TypeService], (service: TypeService) => {
    expect(service).toBeTruthy();
  }));
});
