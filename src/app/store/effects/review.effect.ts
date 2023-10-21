import { HomeService } from './../../home/home.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import {
  getReviewsAction,
  getReviewsFailureAction,
  getReviewsSuccessAction,
} from '../actions/review.action';
import { ProductDetailService } from 'src/app/product-detail/product-detail.service';

@Injectable()
export class RewiewsEffect {
  getReviewsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getReviewsAction),
      switchMap((res) =>
        this.productDetailsService.fetchReviews(res.id).pipe(
          map((items) => getReviewsSuccessAction({ items })),
          catchError(() => of(getReviewsFailureAction()))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private productDetailsService: ProductDetailService
  ) {}
}
