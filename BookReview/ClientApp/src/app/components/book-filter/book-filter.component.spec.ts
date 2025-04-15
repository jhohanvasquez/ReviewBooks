import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReviewFilterComponent } from './book-filter.component';

describe('ReviewFilterComponent', () => {
  let component: ReviewFilterComponent;
  let fixture: ComponentFixture<ReviewFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ReviewFilterComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
