import { AuthService } from './auth.service';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../store/state.model';
import { registerAction, loginAction } from '../store/actions/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private authService: AuthService, private store: Store<AppStateInterface>) {}

  @ViewChild('f') slForm: NgForm;
  isAuthentication: boolean = true;
  isErrorPopupHidden: boolean = false;

  onSubmit(form: NgForm) {
    const user = {
      email: form.controls['email'].value,
      password: form.controls['password'].value,
    };

    if (this.isAuthentication) {
      this.store.dispatch(registerAction(user));
    } else {
      this.store.dispatch(loginAction(user));
    }

    this.authService.isErrorPopupHidden.subscribe((isHidden) => {
      this.isErrorPopupHidden = isHidden;
    });
  }

  onChangeAuth() {
    this.isAuthentication = !this.isAuthentication;
  }
}
