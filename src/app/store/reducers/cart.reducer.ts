import { Action, createReducer, on } from '@ngrx/store';
import {
  getCartDataFailureAction,
  getCartDataSuccessAction,
  deleteCartOrderSuccessAction,
  deleteCartOrderFailureAction,
  updateCartOrderSuccessAction,
  updateCartOrderFailureAction,
  addCartOrderSuccessAction,
  addCartOrderFailureAction
} from '../actions/cart.action';
import { CartStateInterface } from '../state.model';

const initialState: CartStateInterface = {
  items: [],
};

const cartReducer = createReducer(
  initialState,
  on(
    getCartDataSuccessAction,
    (state, action): CartStateInterface => ({
      ...state,
      items: action.items,
    }),
  ),
  on(
    getCartDataFailureAction,
    (): CartStateInterface => ({
      ...initialState
    }),
  ),
  on(
    deleteCartOrderSuccessAction,
    (state, action): CartStateInterface => ({
      ...state,
      items: state.items.filter(item => item.id !== action.id),
    }),
  ),
  on(
    deleteCartOrderFailureAction,
    (state): CartStateInterface => ({
      ...state
    }),
  ),
  on(
    updateCartOrderSuccessAction,
    (state, action): CartStateInterface => ({
      ...state,
      items: state.items.map(item => item.id === action.id ?{ ...item, ...action.newOrder }: item),
    }),
  ),
  on(
    updateCartOrderFailureAction,
    (state): CartStateInterface => ({
      ...state
    }),
  ),
  on(
    addCartOrderSuccessAction,
    (state, action): CartStateInterface => ({
      ...state,
      items: [...state.items, action.newOrder],
    }),
  ),
  on(
    addCartOrderFailureAction,
    (state): CartStateInterface => ({
      ...state
    }),
  )
);

export function reducer(state: CartStateInterface, action: Action) {
  return cartReducer(state, action);
}
