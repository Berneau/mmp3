import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ProductVendorListComponent } from './product-vendor-list.component';

import { ProductService } from './../services/product.service';

describe('ProductVendorListComponent', () => {
  let component: ProductVendorListComponent;
  let fixture: ComponentFixture<ProductVendorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVendorListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        ProductService,
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
    fixture = TestBed.createComponent(ProductVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
