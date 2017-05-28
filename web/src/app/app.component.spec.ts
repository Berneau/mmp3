/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

import { HeaderBarComponent } from './header-bar/header-bar.component';
import { SlideNavComponent } from './slide-nav/slide-nav.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';

import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        HeaderBarComponent,
        SlideNavComponent,
        FooterBarComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
