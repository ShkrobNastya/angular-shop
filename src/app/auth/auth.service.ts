import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../shared/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  user = new BehaviorSubject<any>(null);
  isAuth = new BehaviorSubject<boolean>(false);

  signUp(user: User) {
    this.dataStorageService.addUser(user).subscribe(
      (user) => {
        this.handleAuthentication(user.email, user.id);
        this.isAuth.next(true);
        this.router.navigate(['/']);
      },
      () => this.isAuth.next(false)
    );
  }

  login(user: User) {
    this.dataStorageService.fetchUser(user).subscribe(
      (user) => {
        if (user.length) {
          const userData = user[0];
          sessionStorage.setItem(
            'userData',
            JSON.stringify({ email: userData.email, id: userData.id })
          );
          this.isAuth.next(true);
          this.router.navigate(['/']);
        }
      },
      () => this.isAuth.next(false)
    );
  }

  logout() {
    this.user.next(null);
    sessionStorage.removeItem('userData');
    this.router.navigate(['/']);
  }

  private handleAuthentication(email: string, id?: number) {
    const user = new User(email, id);
    this.user.next(user);
    sessionStorage.setItem('userData', JSON.stringify(user));
  }
}
