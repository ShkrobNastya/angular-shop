import { ProductDetailService } from './../../product-detail/product-detail.service';
import { Product } from 'src/app/shared/product.model';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-addToCart-button',
  templateUrl: './addToCart-button.component.html',
  styleUrls: ['./addToCart-button.component.scss'],
})
export class AddToCartButtonComponent implements OnInit, OnChanges {
  constructor(
    private productDetailService: ProductDetailService,
    private cartService: CartService,
    private dataStorageService: DataStorageService
  ) {}

  @Input() count: number;
  @Input() productID: number;
  @Input() disabled: boolean;

  isAddToCartBtnClicked: boolean;
  product: Product;

  ngOnInit() {
    this.dataStorageService.fetchProduct(this.productID).subscribe(() => {
      this.product = this.productDetailService.getProduct();
    });
    this.dataStorageService.fetchProductCountInCart(this.productID).subscribe(
      (count) => (this.count = count),
      (error) => {
        this.count = 0;
        this.isAddToCartBtnClicked = false;
      }
    );
  }

  ngOnChanges() {
    this.isAddToCartBtnClicked = !(this.count === 0);
  }

  addToCart() {
    this.count++;
    this.isAddToCartBtnClicked = true;

    let newCartItem = {
      id: this.product.id,
      title: this.product.title,
      count: this.count,
      price: this.product.price,
    };
    this.dataStorageService.addToCart(newCartItem);
  }

  decrementCount() {
    this.count--;
    if (this.count >= 1) {
      this.dataStorageService.updateCart({ count: this.count }, this.productID);
    } else if (this.count === 0) {
      this.dataStorageService.deleteCartOrder(this.productID).subscribe();
      this.isAddToCartBtnClicked = false;
    }
  }

  incrementCount() {
    this.count++;
    this.dataStorageService.updateCart({ count: this.count }, this.productID);
  }
}
