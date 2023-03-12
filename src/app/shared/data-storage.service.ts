import { CartService } from './../cart/cart.service';
import { Cart } from './cart.model';
import { User } from './user.model';
import { ProductDetailService } from './../product-detail/product-detail.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { HomeService } from '../home/home.service';
import { Product } from './product.model';
import { Review } from './review.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private homeService: HomeService,
    private productDetailService: ProductDetailService,
    private cartService: CartService
  ) {}

  fetchProducts() {
    return this.http.get<Product[]>('http://localhost:8000/products').pipe(
      tap((products) => {
        this.homeService.setProducts(products);
      })
    );
  }

  fetchProduct(id: number) {
    return this.http.get<Product>(`http://localhost:8000/products/${id}`).pipe(
      tap((product) => {
        this.productDetailService.setProduct(product);
      })
    );
  }

  filterProducts(filters: string) {
    return this.http
      .get<Product[]>(`http://localhost:8000/products?${filters}`)
      .pipe(
        tap((products) => {
          this.homeService.setProducts(products);
        })
      );
  }

  updateProduct(newProduct: { [key: string]: string }, id: number) {
    return this.http
      .patch<Product>(`http://localhost:8000/products/${id}`, {
        ...newProduct,
      })
      .pipe(
        tap((product) => {
          this.productDetailService.setProduct(product);
        })
      );
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:8000/products/${id}`);
  }

  fetchCart() {
    return this.http.get<Cart[]>('http://localhost:8000/cart').pipe(
      tap((cart) => {
        this.cartService.setCart(cart);
      })
    );
  }

  addToCart(newOrder: { [key: string]: string | number }) {
    return this.http
      .post<Cart>('http://localhost:8000/cart', {
        ...newOrder,
      })
      .subscribe();
  }

  updateCart(newOrder: { [key: string]: number }, id: number) {
    return this.http
      .patch<Cart>(`http://localhost:8000/cart/${id}`, {
        ...newOrder,
      })
      .subscribe();
  }

  deleteCartOrder(id: number) {
    return this.http.delete(`http://localhost:8000/cart/${id}`);
  }

  fetchProductCountInCart(id: number) {
    return this.http
      .get<Cart>(`http://localhost:8000/cart/${id}`)
      .pipe(map((order) => order.count));
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
    return this.http
      .get<Review[]>(`http://localhost:8000/reviews?productId=${id}`)
      .pipe(
        tap((reviews) => {
          this.productDetailService.setReviews(reviews);
        })
      );
  }
}
