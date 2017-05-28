import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MzModalService } from 'ng2-materialize';
import { MzInjectionService } from 'ng2-materialize/dist/shared';

import { AdminEventListComponent } from './admin-event-list.component';

import { EventService } from './../services/event.service';

import 'rxjs/add/operator/toPromise';

describe('AdminEventListComponent', () => {
  let component: AdminEventListComponent;
  let fixture: ComponentFixture<AdminEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEventListComponent ],
      providers: [
        EventService,
        MzModalService,
        MzInjectionService,
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
    fixture = TestBed.createComponent(AdminEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
