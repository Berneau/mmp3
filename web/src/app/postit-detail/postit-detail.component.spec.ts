import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostitDetailComponent } from './postit-detail.component';

describe('PostitDetailComponent', () => {
  let component: PostitDetailComponent;
  let fixture: ComponentFixture<PostitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
