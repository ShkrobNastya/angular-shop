import { Review } from './../shared/review.model';
import { Subject } from "rxjs";
import { Product } from "../shared/product.model";

export class ProductDetailService {
  productChanged = new Subject<Product>();
  reviewsChanged = new Subject<Review[]>();

  private product: Product;
  private reviews: Review[];

  stockPresenceColor: {[key: string]: string} = {
    'In stock': 'green',
    'Almost sold out': 'red',
    'Out of stock': 'grey'
  }

  setProduct(product: Product) {
    this.product = product;
    this.productChanged.next(this.product);
  }

  getProduct() {
    return this.product;
  }

  getStockColor(key: string) {
    return this.stockPresenceColor[key];
  }

  setReviews(reviews: Review[]) {
    this.reviews = reviews;
    this.reviewsChanged.next(this.reviews);
  }

  getReviews() {
    return this.reviews;
  }
}
