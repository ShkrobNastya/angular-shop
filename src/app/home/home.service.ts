import { Subject } from 'rxjs';
import { Product } from '../shared/product.model';

export class HomeService {
  productsChanged = new Subject<Product[]>();

  private products: Product[] = [];

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

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }

  getProducts() {
    return this.products.slice();
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
