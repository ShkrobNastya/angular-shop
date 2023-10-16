import { createSelector } from '@ngrx/store';
import { AppStateInterface, ProductsStateInterface } from '../state.model';

export const productFeatureSelector = (
  state: AppStateInterface
): ProductsStateInterface => state.products;

export const selectProducts = createSelector(
  productFeatureSelector,
  (productsState: ProductsStateInterface) => productsState.items
);
