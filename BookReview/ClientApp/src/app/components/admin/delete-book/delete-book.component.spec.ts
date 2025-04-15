import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteReviewComponent } from './delete-book.component';

describe('DeleteReviewComponent', () => {
  let component: DeleteReviewComponent;
  let fixture: ComponentFixture<DeleteReviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [DeleteReviewComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
