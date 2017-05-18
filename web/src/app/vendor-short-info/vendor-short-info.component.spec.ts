import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorShortInfoComponent } from './vendor-short-info.component';

describe('VendorShortInfoComponent', () => {
  let component: VendorShortInfoComponent;
  let fixture: ComponentFixture<VendorShortInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorShortInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorShortInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
