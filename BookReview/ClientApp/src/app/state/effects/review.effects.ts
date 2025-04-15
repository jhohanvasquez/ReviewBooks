import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { SnackbarService } from "src/app/services/snackbar.service";
import { ReviewService } from "src/app/services/review.service";
import { setAuthState } from "../actions/auth.actions";
import {
  clearReview,
  clearReviewFailure,
  clearReviewSuccess,
  loadReview,
  loadReviewFailure,
  loadReviewSuccess,
  toggleReviewItem,
  toggleReviewItemFailure,
  toggleReviewItemSuccess,
} from "../actions/review.actions";
import { selectAuthenticatedUser } from "../selectors/auth.selectors";

@Injectable()
export class ReviewEffects {
  private readonly actions$ = inject(Actions);
  private readonly reviewService = inject(ReviewService);
  private readonly store = inject(Store);
  private readonly snackbarService = inject(SnackbarService);

  loadReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReview, setAuthState),
      concatLatestFrom(() => this.store.select(selectAuthenticatedUser)),
      switchMap(([, authenticatedUser]) => {
        if (authenticatedUser) {
          return this.reviewService
            .getReviewItems(authenticatedUser.userId)
            .pipe(
              map((review) => loadReviewSuccess({ review })),
              catchError((error) =>
                of(loadReviewFailure({ errorMessage: error }))
              )
            );
        }
        return of(loadReviewFailure({ errorMessage: "User not found" }));
      })
    )
  );

  toggleReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleReviewItem),
      concatLatestFrom(() => this.store.select(selectAuthenticatedUser)),
      switchMap(([action, authenticatedUser]) => {
        if (authenticatedUser) {
          return this.reviewService
            .toggleReviewItem(authenticatedUser.userId, action.bookId, action.comment)
            .pipe(
              map((review) => toggleReviewItemSuccess({ review })),
              tap(() => {
                this.snackbarService.showSnackBar("Review success!!!");
              }),
              catchError((error) =>
                of(toggleReviewItemFailure({ errorMessage: error }))
              )
            );
        }
        return of(
          toggleReviewItemFailure({ errorMessage: "User not found" })
        );
      })
    )
  );

  clearReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearReview),
      concatLatestFrom(() => this.store.select(selectAuthenticatedUser)),
      switchMap(([, authenticatedUser]) => {
        if (authenticatedUser) {
          return this.reviewService
            .clearReview(authenticatedUser.userId)
            .pipe(
              map(() => clearReviewSuccess()),
              tap(() =>
                this.snackbarService.showSnackBar("Review cleared!!!")
              ),
              catchError((error) => {
                console.error(
                  "Error ocurred while removing items from the Review : ",
                  error
                );
                return of(clearReviewFailure({ errorMessage: error }));
              })
            );
        }
        return of(clearReviewFailure({ errorMessage: "User not found" }));
      })
    )
  );
}
