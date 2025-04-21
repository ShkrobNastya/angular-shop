import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (!token) {
      return this.router.createUrlTree(['/auth']);
    }

    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < currentTime) {
        localStorage.removeItem('token');
        return this.router.createUrlTree(['/auth']);
      }

      return true;
    } catch (e) {
      localStorage.removeItem('token');
      return this.router.createUrlTree(['/auth']);
    }
  }
}
