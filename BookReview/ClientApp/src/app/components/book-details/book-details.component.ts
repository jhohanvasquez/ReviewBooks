import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { AddreviewComponent } from "../addreview/addreview.component";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle,
} from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, map } from "rxjs";
import { selectIsAuthenticated, selectAuthenticatedUser } from "src/app/state/selectors/auth.selectors";
import { selectCurrentBookDetails } from "src/app/state/selectors/book.selectors";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardImage,
    MatButton,
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
    AddreviewComponent
  ]
})
export class BookDetailsComponent {
  private readonly store = inject(Store);
  bookDetails$ = combineLatest([
    this.store.select(selectCurrentBookDetails),
    this.store.select(selectIsAuthenticated),
    this.store.select(selectAuthenticatedUser)
  ]).pipe(
    map(([book, isAuthenticated, user]) => {
      if (book === undefined) {
        return null;
      } else {
        return {
          book,
          isAuthenticated,
          user
        };
      }
    })
  );
}
