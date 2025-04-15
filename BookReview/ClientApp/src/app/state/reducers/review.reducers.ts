import { createReducer, on } from "@ngrx/store";
import { Book } from "src/app/models/book";
import { CallState, LoadingState } from "src/app/shared/call-state";
import { logout } from "../actions/auth.actions";
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

export const REVIEW_FEATURE_KEY = "review";

export interface ReviewState {
  review: Book[];
  reviewCallState: CallState;
}

const initialState: ReviewState = {
  review: [],
  reviewCallState: LoadingState.INIT,
};

export const reviewReducer = createReducer(
  initialState,
  on(loadReview, (state) => ({
    ...state,
    reviewCallState: LoadingState.LOADING,
  })),
  on(loadReviewSuccess, (state, { review }) => ({
    ...state,
    review,
    reviewCallState: LoadingState.LOADED,
  })),
  on(loadReviewFailure, (state, { errorMessage }) => ({
    ...state,
    reviewCallState: { errorMessage },
  })),
  on(toggleReviewItem, (state) => ({
    ...state,
    reviewCallState: LoadingState.LOADING,
  })),
  on(toggleReviewItemSuccess, (state, { review }) => ({
    ...state,
    review,
    reviewCallState: LoadingState.LOADED,
  })),
  on(toggleReviewItemFailure, (state, { errorMessage }) => ({
    ...state,
    reviewCallState: { errorMessage },
  })),
  on(clearReview, (state) => ({
    ...state,
    reviewCallState: LoadingState.LOADING,
  })),
  on(clearReviewSuccess, (state) => ({
    ...state,
    review: [],
    reviewCallState: LoadingState.LOADED,
  })),
  on(clearReviewFailure, (state, { errorMessage }) => ({
    ...state,
    reviewCallState: { errorMessage },
  })),
  on(logout, () => ({
    ...initialState,
  }))
);
