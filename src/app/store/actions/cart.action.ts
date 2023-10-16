import { createAction, props } from '@ngrx/store';
import { CartActionTypes } from '../action-types/cart-action-types';
import { Cart } from 'src/app/shared/cart.model';

export const getCartDataSuccessAction = createAction(
  CartActionTypes.GET_CART__DATA_SUCCESS,
  props<{ items: Cart[] }>(),
);

export const getCartDataFailureAction = createAction(CartActionTypes.GET_CART_DATA_FAILURE);

export const getCartDataAction = createAction(
  CartActionTypes.GET_CART_DATA
);

export const deleteCartOrderAction = createAction(
  CartActionTypes.DELETE_CART_ORDER,
  props<{ id: number }>(),
);

export const deleteCartOrderSuccessAction = createAction(
  CartActionTypes.DELETE_CART_ORDER_SUCCESS,
  props<{ id: number }>(),
);

export const deleteCartOrderFailureAction = createAction(CartActionTypes.DELETE_CART_ORDER_FAILURE);

export const updateCartOrderAction = createAction(
  CartActionTypes.UPDATE_CART_ORDER,
  props<{ newOrder: { [key: string]: number }, id: number }>(),
);

export const updateCartOrderSuccessAction = createAction(
  CartActionTypes.UPDATE_CART_ORDER_SUCCESS,
  props<{ newOrder: { [key: string]: number }, id: number }>(),
);

export const updateCartOrderFailureAction = createAction(CartActionTypes.UPDATE_CART_ORDER_SUCCESS);

export const addCartOrderAction = createAction(
  CartActionTypes.ADD_CART_ORDER,
  props<{ newOrder: Cart}>(),
);

export const addCartOrderSuccessAction = createAction(
  CartActionTypes.ADD_CART_ORDER_SUCCESS,
  props<{ newOrder: Cart}>(),
);

export const addCartOrderFailureAction = createAction(CartActionTypes.ADD_CART_ORDER_FAILURE);
