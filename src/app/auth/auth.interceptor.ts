import { AuthService } from 'src/app/auth/auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (req.url.includes('/refresh-token')) {
      return next.handle(req);
    }

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((data: any) => {
              localStorage.setItem('token', data.token);
              const clonedReq = req.clone({
                setHeaders: { Authorization: `Bearer ${data.token}` },
                withCredentials: true,
              });
              return next.handle(clonedReq);
            }),
            catchError((err) => {
              localStorage.removeItem('token');
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
