import { Component } from "@angular/core";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService: AuthService){}

  faShoppingCart = faShoppingCart;
  faRightFromBracket = faRightFromBracket;

  logout() {
    this.authService.logout();
  }
}
