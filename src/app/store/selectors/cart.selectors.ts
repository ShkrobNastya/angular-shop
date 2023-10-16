import { createSelector } from '@ngrx/store';
import { AppStateInterface, CartStateInterface } from '../state.model';

export const cartFeatureSelector = (state: AppStateInterface): CartStateInterface => state.cart;

export const selectCartItems = createSelector(
  cartFeatureSelector,
  (cartState: CartStateInterface) => cartState.items,
);
