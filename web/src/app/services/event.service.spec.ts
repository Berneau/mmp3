import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { EventService } from './event.service';

describe('EventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
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

  it('should ...', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));
});
