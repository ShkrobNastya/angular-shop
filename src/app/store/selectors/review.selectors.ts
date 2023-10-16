import { createSelector } from '@ngrx/store';
import { AppStateInterface, ReviewsStateInterface } from '../state.model';

export const reviewsFeatureSelector = (state: AppStateInterface): ReviewsStateInterface => state.reviews;

export const selectReviewItems = createSelector(
  reviewsFeatureSelector,
  (reviewState: ReviewsStateInterface) => reviewState.items,
);
