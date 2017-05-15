import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostitFormComponent } from './postit-form.component';

describe('PostitFormComponent', () => {
  let component: PostitFormComponent;
  let fixture: ComponentFixture<PostitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
