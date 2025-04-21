import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../shared/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  constructor() {}

  private errorTextSubject = new BehaviorSubject<{
    isVisible: boolean;
    message: string;
  }>({
    isVisible: false,
    message: '',
  });

  setErrorText(isVisible: boolean, message: string) {
    this.errorTextSubject.next({
      isVisible,
      message,
    });
  }

  getErrorText() {
    return this.errorTextSubject.asObservable();
  }
}
