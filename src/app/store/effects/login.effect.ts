import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, tap, catchError, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/auth.action';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      exhaustMap((userData) =>
        this.authService.login(userData).pipe(
          map((user) => {
            return loginSuccessAction({ user });
          }),
          catchError((err) => of(loginFailureAction(err)))
        )
      )
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccessAction),
        tap((userData) => {
          this.authService.setIsLoggedInSubject(true);
          userData.user?.token &&
            localStorage.setItem('token', userData.user.token);
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  logoutFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginFailureAction),
        tap((err) => {
          this.authService.errorTextSubject.next({
            isVisible: true,
            message: err.error.message,
          });
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
