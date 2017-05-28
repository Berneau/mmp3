import { async, ComponentFixture, TestBed } from '@angular/core/testing'; '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MzModalService } from 'ng2-materialize';
import { MzInjectionService } from 'ng2-materialize/dist/shared';

import { AdminVendorListComponent } from './admin-vendor-list.component';

import { VendorService } from './../services/vendor.service';

describe('AdminVendorListComponent', () => {
  let component: AdminVendorListComponent;
  let fixture: ComponentFixture<AdminVendorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVendorListComponent ],
      providers: [
        VendorService,
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
    fixture = TestBed.createComponent(AdminVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
