import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostitListComponent } from './admin-postit-list.component';

describe('AdminPostitListComponent', () => {
  let component: AdminPostitListComponent;
  let fixture: ComponentFixture<AdminPostitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPostitListComponent ]
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
