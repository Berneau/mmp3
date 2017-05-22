import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVendorListComponent } from './product-vendor-list.component';

describe('ProductVendorListComponent', () => {
  let component: ProductVendorListComponent;
  let fixture: ComponentFixture<ProductVendorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVendorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
