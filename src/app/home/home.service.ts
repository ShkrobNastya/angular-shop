import { DataStorageService } from '../shared/data-storage.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HomeService {
  routerObj: { [key: string]: { route: string; queryParam: string } } = {
    reviewsPresence: {
      route: 'isReviewsPresenceChecked',
      queryParam: 'rating.count_ne',
    },
    stockPresence: {
      route: 'isStockPresenceChecked',
      queryParam: 'stock_ne',
    },
    minPrice: {
      route: 'minPrice',
      queryParam: 'price_gte',
    },
    maxPrice: {
      route: 'maxPrice',
      queryParam: 'price_lte',
    },
    minRating: {
      route: 'minRating',
      queryParam: 'rating.rate_gte',
    },
    maxRating: {
      route: 'maxRating',
      queryParam: 'rating.rate_lte',
    },
  };

  filtersTitles: { [key: string]: string } = {
    minPrice: 'from',
    maxPrice: 'to',
    stockPresence: 'in stock',
    reviewsPresence: 'reviewers',
    minRating: '★from',
    maxRating: '★to',
  };

  constructor(private dataStorageService: DataStorageService) {}

  fetchProducts() {
    return this.dataStorageService.fetchProducts();
  }

  deleteProduct(id: number) {
    return this.dataStorageService.deleteProduct(id);
  }

  updateProduct(newProduct: { [key: string]: string }, id: number) {
    return this.dataStorageService.updateProduct(newProduct, id);
  }

  createQueryParams(queryParams: { [key: string]: number | string }) {
    let paramsArr = [];
    for (let key in queryParams) {
      paramsArr.push(
        this.routerObj[key].queryParam +
          '=' +
          (queryParams[key] === 'true' ? 0 : queryParams[key])
      );
    }
    return paramsArr.join('&');
  }

  createBadges(queryParams: any) {
    let filterBadges = [];
    for (let key in queryParams) {
      filterBadges.push(`${this.filtersTitles[key]}:${queryParams[key]}`);
    }
    return filterBadges;
  }
}
