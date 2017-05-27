import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryListComponent } from './admin-category-list.component';

import { CategoryService } from './../services/category.service';

describe('AdminCategoryListComponent', () => {
  let component: AdminCategoryListComponent;
  let fixture: ComponentFixture<AdminCategoryListComponent>;
  let categoryService: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryListComponent ],
      providers: [ CategoryService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryListComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.get(categoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
