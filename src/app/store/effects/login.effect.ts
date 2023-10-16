import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, tap, catchError, of  } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/auth.action';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      exhaustMap((userData) =>  this.authService.login(userData)
      .pipe(
        map(users => users[0]),
        map(user => {
          if (user === undefined) {
            return loginFailureAction();
          } else {
            return loginSuccessAction( {user} )}
          })
         ,
        catchError(() => of(loginFailureAction())),
      ))
    );
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccessAction),
      tap((userData) => {
        this.authService.handleAuthentication(userData.user.email, userData.user.id);
        this.authService.isErrorPopupHidden.next(true);
        this.router.navigate(['/']);
      }),
    );
  },{ dispatch: false });

  logoutFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginFailureAction),
      tap(() => {
        this.authService.isErrorPopupHidden.next(false);
        this.router.navigate(['/']);
      }),
    );
  },{ dispatch: false });

  constructor(private actions$: Actions, private authService: AuthService, private router: Router,) {}
}
