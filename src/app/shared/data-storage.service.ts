import { CartService } from './../cart/cart.service';
import { Cart } from './cart.model';
import { User } from './user.model';
import { ProductDetailService } from './../product-detail/product-detail.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { Product } from './product.model';
import { Review } from './review.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchProducts(filters: string = '') {
    let params = '';
    if (filters) {
      params = '?' + params;
    }
    return this.http.get<Product[]>(`http://localhost:8000/products${params}`);
  }

  updateProduct(newProduct: { [key: string]: string }, id: number) {
    return this.http.patch<Product>(`http://localhost:8000/products/${id}`, {
      ...newProduct,
    });
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:8000/products/${id}`);
  }

  fetchCart() {
    return this.http.get<Cart[]>('http://localhost:8000/cart');
  }

  addCartOrder(newOrder: Cart) {
    return this.http.post<Cart>('http://localhost:8000/cart', {
      ...newOrder,
    });
  }

  updateCartOrder(newOrder: { [key: string]: number }, id: number) {
    return this.http.patch<Cart>(`http://localhost:8000/cart/${id}`, {
      ...newOrder,
    });
  }

  deleteCartOrder(id: number) {
    return this.http.delete(`http://localhost:8000/cart/${id}`);
  }

  addUser(newUser: User) {
    return this.http.post<User>('http://localhost:8000/users', {
      ...newUser,
    });
  }

  fetchUser(user: User) {
    return this.http.get<User[]>(
      `http://localhost:8000/users?email=${user.email}&password=${user.password}`
    );
  }

  fetchReviews(id: number) {
    return this.http.get<Review[]>(
      `http://localhost:8000/reviews?productId=${id}`
    );
  }
}
