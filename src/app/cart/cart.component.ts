import { Cart } from './../shared/cart.model';
import { CartService } from './cart.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit } from "@angular/core";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-200px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ]),
  ]
})
export class CartComponent implements OnInit{
  constructor(private dataStorageService: DataStorageService, private cartService: CartService){}

  cart: Cart[];

  ngOnInit() {
    this.dataStorageService.fetchCart().subscribe(
      () => {
        this.cart = this.cartService.getCart();
      }
    )
  }

  onDelete(id: number) {
    this.dataStorageService.deleteCartOrder(id).subscribe (
      () => {
        this.cart = this.cart.filter(order => order.id !== id);
      }
    )
  }

}
