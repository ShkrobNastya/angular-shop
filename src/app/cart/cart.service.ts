import { Cart } from './../shared/cart.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private dataStorageService: DataStorageService) {}

  fetchCart() {
    return this.dataStorageService.fetchCart();
  }

  updateCartOrder(newOrder: { [key: string]: number }, id: number) {
    return this.dataStorageService.updateCartOrder(newOrder, id);
  }

  addCartOrder(newOrder: Cart) {
    return this.dataStorageService.addCartOrder(newOrder);
  }

  deleteCartOrder(id: number) {
    return this.dataStorageService.deleteCartOrder(id);
  }
}
