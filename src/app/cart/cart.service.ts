import { Subject } from 'rxjs';
import { Cart } from './../shared/cart.model';
export class CartService {
  cartChanged = new Subject<Cart[]>();

  private cart: Cart[] = [];

  setCart(cart: Cart[]) {
    this.cart = cart;
    this.cartChanged.next(this.cart.slice());
  }

  getCart() {
    return this.cart.slice();
  }
}
