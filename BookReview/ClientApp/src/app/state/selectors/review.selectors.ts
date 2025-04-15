import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  REVIEW_FEATURE_KEY,
  ReviewState,
} from "../reducers/review.reducers";

const selectReviewFeatureState =
  createFeatureSelector<ReviewState>(REVIEW_FEATURE_KEY);

export const selectReviewItems = createSelector(
  selectReviewFeatureState,
  (state: ReviewState) => state.review
);

export const selectReviewItemsCount = createSelector(
  selectReviewFeatureState,
  (state: ReviewState) => state?.review.length
);

export const selectReviewCallState = createSelector(
  selectReviewFeatureState,
  (state) => state.reviewCallState
);
