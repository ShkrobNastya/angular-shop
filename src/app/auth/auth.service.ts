import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../shared/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private dataStorageService: DataStorageService
  ) {}

  user = new BehaviorSubject<any>(null);
  isErrorPopupHidden = new BehaviorSubject<boolean>(true);

  register(user: User) {
    return this.dataStorageService.addUser(user);
  }

  login(user: User) {
    return this.dataStorageService.fetchUser(user);
  }

  logout() {
    this.user.next(null);
    sessionStorage.removeItem('userData');
  }

  handleAuthentication(email: string, id?: number) {
    const user = new User(email, id);
    this.user.next(user);
    sessionStorage.setItem('userData', JSON.stringify(user));
  }
}
