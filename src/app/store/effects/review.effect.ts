import { HomeService } from './../../home/home.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, pipe, catchError, of } from 'rxjs';
import { getProductsAction, getProductsSuccessAction, getProductsFailureAction, deleteProductAction, deleteProductSuccessAction, deleteProductFailureAction, updateProductAction, updateProductSuccessAction, updateProductFailureAction  } from '../actions/product.action';
import { ProductEditService } from 'src/app/product-edit/product-edit.service';
import { getReviewsAction, getReviewsFailureAction, getReviewsSuccessAction } from '../actions/review.action';
import { ProductDetailService } from 'src/app/product-detail/product-detail.service';


@Injectable()
export class RewiewsEffect {
  getReviewsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getReviewsAction),
      switchMap((res) =>  this.productDetailsService.fetchReviews(res.id)
      .pipe(
        map(items => getReviewsSuccessAction({items})),
        catchError(() => of(getReviewsFailureAction())),
      ))
    );
  });

  constructor(
    private actions$: Actions,
    private productDetailsService: ProductDetailService,
  ) {}
}
