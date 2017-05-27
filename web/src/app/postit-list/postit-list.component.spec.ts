import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MzModalService } from 'ng2-materialize';
import { MzInjectionService } from 'ng2-materialize/dist/shared';

import { PostitListComponent } from './postit-list.component';

import { PostitConfirmedPipe } from './../pipes/postit-confirmed.pipe';

import { PostitService } from './../services/postit.service';

describe('PostitListComponent', () => {
  let component: PostitListComponent;
  let fixture: ComponentFixture<PostitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostitListComponent, PostitConfirmedPipe ],
      schemas: [NO_ERRORS_SCHEMA],
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
    fixture = TestBed.createComponent(PostitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
