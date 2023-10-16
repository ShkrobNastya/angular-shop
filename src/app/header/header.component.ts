import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { AppStateInterface } from '../store/state.model';
import { Store } from '@ngrx/store';
import { logoutAction } from '../store/actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store<AppStateInterface>) {}

  faShoppingCart = faShoppingCart;
  faRightFromBracket = faRightFromBracket;
  isAuthed: boolean;

  ngOnInit() {
    this.authService.user.subscribe((user) => (this.isAuthed = !!user));
  }

  logout() {
    this.store.dispatch(logoutAction());
  }
}
