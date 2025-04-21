import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../shared/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private dataStorageService: DataStorageService) {}

  // user = new BehaviorSubject<any>(null);
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

  logout() {
    // this.user.next(null);
    // sessionStorage.removeItem('userData');
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('token');
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

  // handleAuthentication(email: string, id?: number) {
  // const user = new User(email, id);
  // this.user.next(user);
  // sessionStorage.setItem('userData', JSON.stringify(user));
  // }
}
