import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddreviewComponent } from './addreview.component';

describe('AddreviewComponent', () => {
  let component: AddreviewComponent;
  let fixture: ComponentFixture<AddreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddreviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
