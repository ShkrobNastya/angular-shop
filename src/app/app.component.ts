import { Component, OnInit } from '@angular/core';
import { getCartDataAction } from './store/actions/cart.action';
import { Store } from '@ngrx/store';
import { AppStateInterface } from './store/state.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-shop';

  constructor(
    private store: Store<AppStateInterface>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(() => {
      if (true) {
        this.store.dispatch(getCartDataAction());
      }
    });
  }
}
