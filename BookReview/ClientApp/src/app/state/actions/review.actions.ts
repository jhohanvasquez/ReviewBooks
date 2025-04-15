import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/models/book";

export const loadReview = createAction("[Review] Load Review");

export const loadReviewSuccess = createAction(
  "[Review] Load Review Success",
  props<{ review: Book[] }>()
);

export const loadReviewFailure = createAction(
  "[Review] Load Review Failure",
  props<{ errorMessage: string }>()
);

export const toggleReviewItem = createAction(
  "[Review] Toggle Review Item",
  props<{ bookId: number; comment: string; isAdd: boolean }>()
);

export const toggleReviewItemSuccess = createAction(
  "[Review] Toggle Review Item Success",
  props<{ review: Book[] }>()
);

export const toggleReviewItemFailure = createAction(
  "[Review] Toggle Review Item Failure",
  props<{ errorMessage: string }>()
);

export const clearReview = createAction("[Review] Clear Review");

export const clearReviewSuccess = createAction(
  "[Review] Clear Review Success"
);

export const clearReviewFailure = createAction(
  "[Review] Clear Review Failure",
  props<{ errorMessage: string }>()
);
