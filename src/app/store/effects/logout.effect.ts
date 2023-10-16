import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { logoutAction } from '../actions/auth.action';

@Injectable()
export class LogoutEffect {
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          console.log('ttt');
          this.authService.logout();
          this.router.navigateByUrl('/');
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}
}
