import { CartService } from 'src/app/cart/cart.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, pipe, catchError, of } from 'rxjs';
import {
  getCartDataAction,
  deleteCartOrderAction,
  getCartDataFailureAction,
  getCartDataSuccessAction,
  deleteCartOrderSuccessAction,
  deleteCartOrderFailureAction,
  updateCartOrderAction,
  updateCartOrderSuccessAction,
  updateCartOrderFailureAction,
  addCartOrderAction,
  addCartOrderSuccessAction,
  addCartOrderFailureAction,
} from '../actions/cart.action';

@Injectable()
export class CartEffect {
  getCartData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCartDataAction),
      switchMap(() =>
        this.cartService.fetchCart().pipe(
          map((items) => getCartDataSuccessAction({ items })),
          catchError(() => of(getCartDataFailureAction()))
        )
      )
    );
  });

  deleteCartOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteCartOrderAction),
      switchMap((res) =>
        this.cartService.deleteCartOrder(res.id).pipe(
          map(() => deleteCartOrderSuccessAction(res)),
          catchError(() => of(deleteCartOrderFailureAction()))
        )
      )
    );
  });

  updateCartOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCartOrderAction),
      switchMap((res) =>
        this.cartService.updateCartOrder(res.newOrder, res.id).pipe(
          map(() => updateCartOrderSuccessAction(res)),
          catchError(() => of(updateCartOrderFailureAction()))
        )
      )
    );
  });

  addCartOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addCartOrderAction),
      switchMap((res) =>
        this.cartService.addCartOrder(res.newOrder).pipe(
          map(() => addCartOrderSuccessAction(res)),
          catchError(() => of(addCartOrderFailureAction()))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private router: Router
  ) {}
}
