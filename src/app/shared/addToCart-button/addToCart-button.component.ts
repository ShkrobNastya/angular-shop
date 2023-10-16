import { Cart } from './../cart.model';
import { ProductDetailService } from './../../product-detail/product-detail.service';
import { Product } from 'src/app/shared/product.model';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { DataStorageService } from '../data-storage.service';
import { AppStateInterface } from 'src/app/store/state.model';
import { Store } from '@ngrx/store';
import { selectProducts } from 'src/app/store/selectors/product.selectors';
import { selectCartItems } from 'src/app/store/selectors/cart.selectors';
import { addCartOrderAction, deleteCartOrderAction, updateCartOrderAction } from 'src/app/store/actions/cart.action';

@Component({
  selector: 'app-addToCart-button',
  templateUrl: './addToCart-button.component.html',
  styleUrls: ['./addToCart-button.component.scss'],
})
export class AddToCartButtonComponent implements OnInit, OnChanges {
  constructor(
    private productDetailService: ProductDetailService,
    private cartService: CartService,
    private dataStorageService: DataStorageService,
    private store: Store<AppStateInterface>,
  ) {}

  @Input() count: number;
  @Input() productID: number;
  @Input() disabled: boolean;

  isCounterVisible = false;
  product: any;

  ngOnInit() {
    this.store.select(selectProducts).subscribe(products =>
      {
        this.product = products.filter(product => product.id === this.productID)[0];
        this.store.select(selectCartItems).subscribe(
          (items) => {
            const count = items.filter(product => product.id === this.productID)[0]?.count;
            if(count) {
              this.count = count;
              this.isCounterVisible = true;
            }
          },
          () => {
            this.count = 0;
            this.isCounterVisible = false;
          });
      }
    )
  }

  ngOnChanges() {
    this.isCounterVisible = this.count !== 0;
  }

  addToCart() {
    this.count++;
    this.isCounterVisible = true;

    const newOrder = {
      id: this.product.id,
      title: this.product.title,
      count: this.count,
      price: this.product.price,
    };

    this.store.dispatch(addCartOrderAction({newOrder}));
  }

  decrementCount() {
    this.count--;
    if (this.count >= 1) {
      let newOrder: { [key: string]: number } = {'count' : this.count};
      this.store.dispatch(updateCartOrderAction({newOrder, id:this.product.id}));
    } else if (this.count === 0) {
      this.store.dispatch(deleteCartOrderAction({id:this.productID}));
      this.isCounterVisible = false;
    }
  }

  incrementCount() {
    this.count++;
    let newOrder: { [key: string]: number } = {'count' : this.count};
    this.store.dispatch(updateCartOrderAction({newOrder, id:this.product.id}));
  }
}
