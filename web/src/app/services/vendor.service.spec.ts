import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { VendorService } from './vendor.service';

describe('VendorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VendorService,
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

  it('should ...', inject([VendorService], (service: VendorService) => {
    expect(service).toBeTruthy();
  }));
});
