import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManageReviewsComponent } from './manage-books.component';

describe('ManageReviewsComponent', () => {
  let component: ManageReviewsComponent;
  let fixture: ComponentFixture<ManageReviewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ManageReviewsComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
