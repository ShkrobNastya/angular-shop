import { HomeService } from './../../home/home.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, pipe, catchError, of } from 'rxjs';
import { getProductsAction, getProductsSuccessAction, getProductsFailureAction, deleteProductAction, deleteProductSuccessAction, deleteProductFailureAction, updateProductAction, updateProductSuccessAction, updateProductFailureAction  } from '../actions/product.action';
import { ProductEditService } from 'src/app/product-edit/product-edit.service';


@Injectable()
export class ProductsEffect {
  getProductsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProductsAction),
      switchMap(() =>  this.homeService.fetchProducts()
      .pipe(
        map(items => getProductsSuccessAction({items})),
        catchError(() => of(getProductsFailureAction())),
      ))
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteProductAction),
      switchMap((res) =>  this.homeService.deleteProduct(res.id)
      .pipe(
        map(() => deleteProductSuccessAction(res)),
        catchError(() => of(deleteProductFailureAction())),
      ))
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProductAction),
      switchMap((res) =>  this.homeService.updateProduct(res.newProduct, res.id)
      .pipe(
        map(() => updateProductSuccessAction(res)),
        catchError(() => of(updateProductFailureAction())),
      ))
    );
  });

  updateProductSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProductSuccessAction),
      tap(() => {
        this.productEditService.isToastVisible.next(true);
        setTimeout(() => {
          this.productEditService.isToastVisible.next(false);
        }, 500);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      }),
    );
  },{ dispatch: false });

  constructor(
    private actions$: Actions,
    private homeService: HomeService,
    private productEditService: ProductEditService,
    private router: Router,
  ) {}
}
