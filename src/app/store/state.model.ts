import { Product } from 'src/app/shared/product.model';
import { Cart } from '../shared/cart.model';
import { Review } from '../shared/review.model';

export interface AppStateInterface {
  auth: AuthStateInterface;
  cart: CartStateInterface;
  products: ProductsStateInterface;
  reviews: ReviewsStateInterface;
}

export interface AuthStateInterface {
  isLoggedIn: boolean;
  userEmail: string | null;
}

export interface CartStateInterface {
  items: Cart[];
}

export interface ProductsStateInterface {
  items: Product[];
}

export interface ReviewsStateInterface {
  items: Review[];
}
