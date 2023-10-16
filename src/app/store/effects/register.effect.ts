import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap, pipe, catchError, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import {
  registerAction,
  registerSuccessAction,
  registerFailureAction,
} from '../actions/auth.action';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerAction),
      exhaustMap((userData) =>
        this.authService.register(userData).pipe(
          map((user) => registerSuccessAction({ user })),
          catchError(() => of(registerFailureAction()))
        )
      )
    );
  });

  registerSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registerSuccessAction),
        tap((userData) => {
          this.authService.handleAuthentication(
            userData.user.email,
            userData.user.id
          );
          this.authService.isErrorPopupHidden.next(true);
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registerFailureAction),
        tap(() => {
          this.authService.isErrorPopupHidden.next(false);
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
