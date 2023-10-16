import { Review } from './../../shared/review.model';
import { ReviewsActionTypes } from './../action-types/review-action-types';
import { createAction, props } from '@ngrx/store';

export const getReviewsAction = createAction(
  ReviewsActionTypes.GET_REVIEWS_DATA,
  props<{ id: number }>(),
);

export const getReviewsSuccessAction = createAction(
  ReviewsActionTypes.GET_REVIEWS_SUCCESS,
  props<{ items: Review[] }>(),
);
export const getReviewsFailureAction = createAction(ReviewsActionTypes.GET_REVIEWS_FAILURE);
