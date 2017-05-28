import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormBuilder } from '@angular/forms';
import { MzModalService } from 'ng2-materialize';
import { MzInjectionService } from 'ng2-materialize/dist/shared';

import { VendorFormComponent } from './vendor-form.component';

import { VendorService } from './../services/vendor.service';
import { UserService } from './../services/user.service';

describe('VendorFormComponent', () => {
  let component: VendorFormComponent;
  let fixture: ComponentFixture<VendorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorFormComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        VendorService,
        UserService,
        MzModalService,
        MzInjectionService,
        FormBuilder,
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
