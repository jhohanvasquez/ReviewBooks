import { NgClass } from "@angular/common";
import { Component, inject, Input, OnChanges, OnDestroy } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { Store } from "@ngrx/store";
import { ReplaySubject, takeUntil } from "rxjs";
import { Book } from "src/app/models/book";
import { toggleReviewItem } from "src/app/state/actions/review.actions";
import { selectReviewItems } from "src/app/state/selectors/review.selectors";
import { ReviewService } from "src/app/services/review.service";

@Component({
  selector: "app-addreview",
  templateUrl: "./addreview.component.html",
  styleUrls: ["./addreview.component.scss"],
  imports: [MatButton, NgClass]
})
export class AddreviewComponent implements OnChanges, OnDestroy {
  private readonly reviewService = inject(ReviewService);

  @Input()
  bookId: number;

  @Input()
  comment: string;

  @Input()
  userID: number;

  @Input()
  showButton = false;

  private readonly store = inject(Store);

  userId = localStorage.getItem("userId");
  toggle = false;
  buttonText = "";
  commentText = "";
  private destroyed$ = new ReplaySubject<void>(1);

  ngOnChanges() {
    this.store
      .select(selectReviewItems)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((bookData: Book[]) => {
        this.setFavourite(bookData);
        this.setButtonText();
      });
  }

  private setFavourite(bookData: Book[]) {
    const favBook = bookData.find((f) => f.bookId === this.bookId);

    if (favBook) {
      this.toggle = true;
    } else {
      this.toggle = false;
    }
  }

  private setButtonText() {
    debugger;
    //this.commentText = this.reviewService.getReviewUser(this.userID);
    if (this.toggle) {
      this.buttonText = "Remove from Review";
    } else {
      this.buttonText = "Add to Review";
    }
  }

  toggleValue(value: string) {
    this.toggle = !this.toggle;
    this.setButtonText();

    this.store.dispatch(
      toggleReviewItem({
        bookId: this.bookId,
        comment: value,
        isAdd: this.toggle,
      })
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
