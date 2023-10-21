import { CART, PRODUCTS, REWIEWS, USERS } from './../mocks/db-data';
import { TestBed } from '@angular/core/testing';
import { DataStorageService } from './data-storage.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from './product.model';
import { Cart } from './cart.model';

describe('DataStorageService', () => {
  let dataStorageService: DataStorageService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataStorageService],
    });

    dataStorageService = TestBed.inject(DataStorageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should fetchProducts', () => {
    dataStorageService.fetchProducts().subscribe((products) => {
      expect(products).toBeTruthy();
      expect(products.length).toBe(5);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:8000/products'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(Object.values(PRODUCTS));
  });

  it('should update product', () => {
    const newValue: { [key: string]: string } = {
      title:
        'Van Cleef & Arpels Extraordinaire Precious Oud Eau de Parfum, 75ml',
    };

    const id = 5;

    dataStorageService.updateProduct(newValue, id).subscribe((product) => {
      expect(product.id).toBe(id);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:8000/products/${id}`
    );
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body.title).toEqual(newValue['title']);
    req.flush({ ...PRODUCTS[2], ...newValue });
  });

  it('should add product', () => {
    const newOrder = {
      id: 3,
      title: 'Moresque Gold Collection Sole Eau de Parfum, 50ml',
      count: 10,
      price: 287,
    };

    dataStorageService.addCartOrder(newOrder).subscribe((order) => {
      expect(order.id).toBe(newOrder.id);
    });

    const req = httpTestingController.expectOne(`http://localhost:8000/cart`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.title).toEqual(newOrder['title']);
    expect(req.request.body.count).toEqual(newOrder['count']);
    expect(req.request.body.price).toEqual(newOrder['price']);
  });

  it('should delete product', () => {
    const id = 5;

    dataStorageService.deleteProduct(id).subscribe();

    const req = httpTestingController.expectOne(
      `http://localhost:8000/products/${id}`
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush(
      Object.values(PRODUCTS).filter((product) => {
        if (product instanceof Product && product.id !== id) {
          return product;
        }
        return;
      })
    );
  });

  it('should fetchCart', () => {
    dataStorageService.fetchCart().subscribe((cart) => {
      expect(cart).toBeTruthy();
      expect(cart.length).toBe(2);
    });

    const req = httpTestingController.expectOne('http://localhost:8000/cart');
    expect(req.request.method).toEqual('GET');
    req.flush(Object.values(CART));
  });

  it('should update cart order', () => {
    const newValue: { [key: string]: number } = {
      count: 2,
    };

    const id = 1;

    dataStorageService.updateCartOrder(newValue, id).subscribe((cart) => {
      expect(cart.id).toBe(1);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:8000/cart/${id}`
    );
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body.count).toEqual(newValue['count']);
    req.flush({ ...CART[1], ...newValue });
  });

  it('should delete cart order', () => {
    const id = 2;

    dataStorageService.deleteCartOrder(id).subscribe();

    const req = httpTestingController.expectOne(
      `http://localhost:8000/cart/${id}`
    );
    expect(req.request.method).toEqual('DELETE');

    req.flush(
      Object.values(CART).filter((cart) => {
        if (cart instanceof Cart && cart.id !== id) {
          return cart;
        }
        return;
      })
    );
  });

  it('should fetchReviews', () => {
    const productId = 3;
    dataStorageService.fetchReviews(productId).subscribe((reviews) => {
      expect(reviews).toBeTruthy();
      expect(reviews.length).toBe(2);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:8000/reviews?productId=${productId}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(REWIEWS.filter((review) => review.productId === productId));
  });

  it('should fetchUser', () => {
    const user = { email: 'user@gmail.com', password: '1111' };

    dataStorageService.fetchUser(user).subscribe((reviews) => {
      expect(reviews).toBeTruthy();
      expect(reviews.length).toBe(1);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:8000/users?email=${user.email}&password=${user.password}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(
      USERS.filter(
        (userData) =>
          userData.email === user.email && userData.password === user.password
      )
    );
  });

  it('should add user', () => {
    const newUser = {
      email: 'user3@gmail.com',
      password: '3333',
      id: 4,
    };

    dataStorageService.addUser(newUser).subscribe((user) => {
      expect(user.email).toBe(newUser.email);
    });

    const req = httpTestingController.expectOne('http://localhost:8000/users');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.email).toEqual(newUser['email']);
    expect(req.request.body.password).toEqual(newUser['password']);
    expect(req.request.body.id).toEqual(newUser['id']);
  });
});
