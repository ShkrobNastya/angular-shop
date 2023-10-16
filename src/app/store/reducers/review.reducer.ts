import {
  ProductsStateInterface,
  ReviewsStateInterface,
} from './../state.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getProductsSuccessAction,
  getProductsFailureAction,
  deleteProductSuccessAction,
  deleteProductFailureAction,
  updateProductFailureAction,
  updateProductSuccessAction,
} from '../actions/product.action';
import { Product } from 'src/app/shared/product.model';
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
