import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FormBuilder } from '@angular/forms';
import { MzModalService } from 'ng2-materialize';
import { MzInjectionService } from 'ng2-materialize/dist/shared';

import { TypeFormComponent } from './type-form.component';

import { TypeService } from './../services/type.service';

describe('TypeFormComponent', () => {
  let component: TypeFormComponent;
  let fixture: ComponentFixture<TypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeFormComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        TypeService,
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
    fixture = TestBed.createComponent(TypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
