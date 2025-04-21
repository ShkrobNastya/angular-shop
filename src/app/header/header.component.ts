import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { AppStateInterface } from '../store/state.model';
import { Store } from '@ngrx/store';
import { logoutAction } from '../store/actions/auth.action';
import { NotificationsService } from '../shared/notifications.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private store: Store<AppStateInterface>
  ) {}

  faShoppingCart = faShoppingCart;
  faRightFromBracket = faRightFromBracket;
  isAuthed: boolean;
  notificationMessage = {
    isVisible: false,
    message: '',
  };

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.isAuthed = isLoggedIn)
    );
    this.notificationsService.getErrorText().subscribe((errorMessage) => {
      if (errorMessage.isVisible) {
        this.notificationMessage = errorMessage;
        this.notificationMessage.message = errorMessage.message;
        setTimeout(() => {
          this.notificationMessage = {
            isVisible: false,
            message: '',
          };
        }, 5000);
      }
    });
  }

  logout() {
    this.store.dispatch(logoutAction());
  }
}
