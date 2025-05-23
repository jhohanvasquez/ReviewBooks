import { AsyncPipe, CurrencyPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from "@angular/core";
import { MatCard, MatCardContent, MatCardImage } from "@angular/material/card";
import { MatTooltip } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { Book } from "src/app/models/book";
import {
  selectIsAuthenticated,
} from "src/app/state/selectors/auth.selectors";

@Component({
    selector: "app-book-card",
    templateUrl: "./book-card.component.html",
    styleUrls: ["./book-card.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCard,
        RouterLink,
        MatTooltip,
        MatCardImage,
        MatCardContent,
        AsyncPipe,
        CurrencyPipe,
    ]
})
export class BookCardComponent {
  @Input()
  book: Book;

  isActive = false;

  private readonly store = inject(Store);

  isAuthenticatedUser$ = this.store.select(selectIsAuthenticated);
}
