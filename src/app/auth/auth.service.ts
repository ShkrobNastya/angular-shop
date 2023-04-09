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
  isErrorPopupHidden = new BehaviorSubject<boolean>(true);

  register(user: User) {
    this.dataStorageService.addUser(user).subscribe(
      (user) => {
        this.handleAuthentication(user.email, user.id);
        this.isErrorPopupHidden.next(true);
        this.router.navigate(['/']);
      },
      () => this.isErrorPopupHidden.next(false)
    );
  }

  login(user: User) {
    this.dataStorageService.fetchUser(user).subscribe(
      (users) => {
        if (users.length) {
          const userData = users[0];
          this.handleAuthentication(userData.email, userData.id);
          this.isErrorPopupHidden.next(true);
          this.router.navigate(['/']);
        }
      },
      () => this.isErrorPopupHidden.next(false)
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
