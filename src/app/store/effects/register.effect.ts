import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap, catchError, of } from 'rxjs';
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
          catchError((err) => of(registerFailureAction(err)))
        )
      )
    );
  });

  registerSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registerSuccessAction),
        tap((userData) => {
          userData.user?.token &&
            localStorage.setItem('token', userData.user.token);
          this.authService.setIsLoggedInSubject(true);
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
