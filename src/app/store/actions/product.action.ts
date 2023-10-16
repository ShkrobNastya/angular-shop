import { createAction, props } from '@ngrx/store';
import { ProductsActionTypes } from '../action-types/product-action-types';
import { Product } from 'src/app/shared/product.model';

export const getProductsAction = createAction(
  ProductsActionTypes.GET_PRODUCTS_DATA,
  props<{ filters: string }>(),
);

export const getProductsSuccessAction = createAction(
  ProductsActionTypes.GET_PRODUCTS_SUCCESS,
  props<{ items: Product[] }>(),
);
export const getProductsFailureAction = createAction(ProductsActionTypes.GET_PRODUCTS_FAILURE);

export const deleteProductAction = createAction(
  ProductsActionTypes.DELETE_PRODUCT,
  props<{ id: number }>(),
);
export const deleteProductSuccessAction = createAction(
  ProductsActionTypes.DELETE_PRODUCT_SUCCESS,
  props<{ id: number }>(),
);
export const deleteProductFailureAction = createAction(ProductsActionTypes.DELETE_PRODUCT_FAILURE);

export const updateProductAction = createAction(
  ProductsActionTypes.UPDATE_PRODUCT,
  props<{  newProduct: { [key: string]: string }, id: number }>(),
);
export const updateProductSuccessAction = createAction(
  ProductsActionTypes.UPDATE_PRODUCT_SUCCESS,
  props<{  newProduct: { [key: string]: string }, id: number }>(),
);
export const updateProductFailureAction = createAction(ProductsActionTypes.UPDATE_PRODUCT_FAILURE);
