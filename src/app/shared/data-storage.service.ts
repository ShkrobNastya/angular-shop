import { CartService } from './../cart/cart.service';
import { Cart } from './cart.model';
import { User } from './user.model';
import { ProductDetailService } from './../product-detail/product-detail.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { Product } from './product.model';
import { Review } from './review.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchProducts(queryParams: { [key: string]: any }) {
    const keys = [
      'minPrice',
      'maxPrice',
      'minRating',
      'maxRating',
      'stockPresence',
      'reviewsPresence',
    ];
    let httpParams = new HttpParams();
    keys.forEach((key) => {
      const value = queryParams[key];
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, value);
      }
    });

    return this.http.get<Product[]>('http://localhost:8000/products', {
      params: httpParams,
    });
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
    return this.http.get<Cart[]>('http://localhost:8000/cart', {
      withCredentials: true,
    });
  }

  addCartOrder(newOrder: Cart) {
    return this.http.post<Cart>(
      'http://localhost:8000/cart',
      {
        ...newOrder,
      },
      { withCredentials: true }
    );
  }

  updateCartOrder(newOrder: { [key: string]: number }, id: number) {
    return this.http.patch<Cart>(
      `http://localhost:8000/cart/${id}`,
      {
        ...newOrder,
      },
      { withCredentials: true }
    );
  }

  deleteCartOrder(id: number) {
    return this.http.delete(`http://localhost:8000/cart/${id}`, {
      withCredentials: true,
    });
  }

  addUser(newUser: User) {
    return this.http.post<User>('http://localhost:8000/users/register', {
      ...newUser,
    });
  }

  fetchUser(user: User) {
    return this.http.post<User>(
      'http://localhost:8000/users/login',
      {
        ...user,
      },
      { withCredentials: true }
    );
  }

  fetchReviews(id: number) {
    return this.http.get<Review[]>(
      `http://localhost:8000/reviews?productId=${id}`
    );
  }

  sendFeedbackMessage(payload: any) {
    return this.http.post(
      'http://localhost:8000/notifications/feedbackForm',
      payload
    );
  }

  refreshToken() {
    return this.http.post(
      'http://localhost:8000/refresh-token',
      {},
      { withCredentials: true }
    );
  }

  logout() {
    return this.http.post(
      'http://localhost:8000/users/logout',
      {},
      { withCredentials: true }
    );
  }
}
