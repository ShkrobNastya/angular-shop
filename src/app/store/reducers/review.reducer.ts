import { ReviewsStateInterface } from './../state.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getReviewsFailureAction,
  getReviewsSuccessAction,
} from '../actions/review.action';

const initialState: ReviewsStateInterface = {
  items: [],
};

const reviewsReducer = createReducer(
  initialState,
  on(
    getReviewsSuccessAction,
    (state, action): ReviewsStateInterface => ({
      ...state,
      items: action.items,
    })
  ),
  on(
    getReviewsFailureAction,
    (): ReviewsStateInterface => ({
      ...initialState,
    })
  )
);

export function reducer(state: ReviewsStateInterface, action: Action) {
  return reviewsReducer(state, action);
}
