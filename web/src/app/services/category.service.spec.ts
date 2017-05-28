import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
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

  it('should ...', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
});
