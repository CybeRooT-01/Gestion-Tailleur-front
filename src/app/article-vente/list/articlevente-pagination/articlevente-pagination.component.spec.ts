import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleventePaginationComponent } from './articlevente-pagination.component';

describe('ArticleventePaginationComponent', () => {
  let component: ArticleventePaginationComponent;
  let fixture: ComponentFixture<ArticleventePaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleventePaginationComponent]
    });
    fixture = TestBed.createComponent(ArticleventePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
