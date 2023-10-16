import { ProductsStateInterface } from './../state.model';
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

const initialState: ProductsStateInterface = {
  items: [],
};

const productsReducer = createReducer(
  initialState,
  on(
    getProductsSuccessAction,
    (state, action): ProductsStateInterface => ({
      ...state,
      items: action.items,
    }),
  ),
  on(
    getProductsFailureAction,
    (): ProductsStateInterface => ({
      ...initialState
    }),
  ),
  on(
    deleteProductSuccessAction,
    (state, action): ProductsStateInterface => ({
      ...state,
      items: state.items.filter(item => item.id !== action.id) as Product[],
    }),
  ),
  on(
    deleteProductFailureAction,
    (state): ProductsStateInterface => ({
      ...state
    }),
  ),
  on(
    updateProductSuccessAction,
    (state, action): ProductsStateInterface => ({
      ...state,
      items: state.items.map(item => item.id === action.id ?{ ...item, ...action.newProduct }: item) as Product[],
    }),
  ),
  on(
    updateProductFailureAction,
    (state): ProductsStateInterface => ({
      ...state
    }),
  )
);

export function reducer(state: ProductsStateInterface, action: Action) {
  return productsReducer(state, action);
}
