import { Cart } from './../shared/cart.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AppStateInterface } from '../store/state.model';
import { selectCartItems } from './../store/selectors/cart.selectors';
import { deleteCartOrderAction } from '../store/actions/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-200px)',
        }),
        animate(300),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            transform: 'translateX(100px)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class CartComponent implements OnInit {
  constructor(
    private store: Store<AppStateInterface>
  ) {}

  cart: Cart[];

  ngOnInit() {
    this.store.select(selectCartItems).subscribe(cart => {
      this.cart = cart;
    });
  }

  onDelete(id: number) {
    this.store.dispatch(deleteCartOrderAction({id}));
  }
}
