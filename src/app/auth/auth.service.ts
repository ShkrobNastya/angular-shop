import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../shared/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private dataStorageService: DataStorageService) {}

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkAuth());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  errorTextSubject = new BehaviorSubject<{
    isVisible: boolean;
    message: string;
  }>({
    isVisible: false,
    message: '',
  });

  register(user: User) {
    return this.dataStorageService.addUser(user);
  }

  login(user: User) {
    return this.dataStorageService.fetchUser(user);
  }

  setIsLoggedInSubject(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  refreshToken(): Observable<any> {
    return this.dataStorageService.refreshToken();
  }

  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('token');
    this.dataStorageService.logout().subscribe();
  }

  private checkAuth(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (e) {
      return false;
    }
  }
}
