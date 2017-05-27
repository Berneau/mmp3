import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MzModalService } from 'ng2-materialize';
import { MzInjectionService } from 'ng2-materialize/dist/shared';

import { AdminPostitListComponent } from './admin-postit-list.component';

import { PostitConfirmedPipe } from './../pipes/postit-confirmed.pipe';

import { PostitService } from './../services/postit.service';

describe('AdminPostitListComponent', () => {
  let component: AdminPostitListComponent;
  let fixture: ComponentFixture<AdminPostitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPostitListComponent, PostitConfirmedPipe],
      providers: [
        PostitService,
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
    fixture = TestBed.createComponent(AdminPostitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
