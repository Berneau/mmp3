/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginService } from './login.service';
import { UserService } from './../services/user.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        LoginService,
        UserService,
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

  it('should ...', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
