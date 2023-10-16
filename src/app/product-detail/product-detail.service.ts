import { Injectable } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class ProductDetailService {
  constructor(private dataStorageService: DataStorageService) {}

  stockPresenceColor: { [key: string]: string } = {
    'In stock': 'green',
    'Almost sold out': 'red',
    'Out of stock': 'grey',
  };

  getStockColor(key: string) {
    return this.stockPresenceColor[key];
  }

  fetchReviews(id: number) {
    return this.dataStorageService.fetchReviews(id);
  }
}
