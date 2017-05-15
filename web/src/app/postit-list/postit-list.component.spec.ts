import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostitListComponent } from './postit-list.component';

describe('PostitListComponent', () => {
  let component: PostitListComponent;
  let fixture: ComponentFixture<PostitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostitListComponent ]
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
