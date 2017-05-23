import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVendorListComponent } from './admin-vendor-list.component';

describe('AdminVendorListComponent', () => {
  let component: AdminVendorListComponent;
  let fixture: ComponentFixture<AdminVendorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVendorListComponent ]
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
