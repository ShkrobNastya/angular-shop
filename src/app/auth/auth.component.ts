import { AuthService } from './auth.service';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  @ViewChild('f') slForm: NgForm;
  isAuthentication: boolean = true;
  isErrorPopupHidden: boolean = false;

  onSubmit(form: NgForm) {
    const user: User = {
      email: form.controls['email'].value,
      password: form.controls['password'].value,
    };

    if (this.isAuthentication) {
      this.authService.register(user);
    } else {
      this.authService.login(user);
    }

    this.authService.isErrorPopupHidden.subscribe((val) => {
      this.isErrorPopupHidden = val;
    });
  }

  onChangeAuth() {
    this.isAuthentication = !this.isAuthentication;
  }
}
