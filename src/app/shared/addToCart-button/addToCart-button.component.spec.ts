import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AddToCartButtonComponent } from './addToCart-button.component';
import {
  addCartOrderAction,
  deleteCartOrderAction,
  updateCartOrderAction,
} from 'src/app/store/actions/cart.action';
import { Cart } from '../cart.model';

describe('AddToCartButtonComponent', () => {
  let component: AddToCartButtonComponent;
  let fixture: ComponentFixture<AddToCartButtonComponent>;
  let de: DebugElement;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartButtonComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addCartOrderAction when user clicks on addToCart', () => {
    const count = 3;
    const newOrder: Cart = {
      id: 1,
      title: 'Title',
      count: count + 1,
      price: 123,
    };
    component.product = newOrder;
    component.count = count;
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.addToCart();
    expect(component.count).toBe(count + 1);
    expect(dispatchSpy).toHaveBeenCalledWith(addCartOrderAction({ newOrder }));
  });

  it('should dispatch updateCartOrderAction when incrementCount', () => {
    const count = 3;
    component.count = count;
    const newOrder = {
      id: 1,
    };
    component.product = { id: 1 };
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.incrementCount();
    expect(component.count).toBe(count + 1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      updateCartOrderAction({ newOrder: { count: count + 1 }, id: newOrder.id })
    );
  });

  it('should dispatch deleteCartOrderAction if count is 1', () => {
    const count = 1;
    const productId = 2;
    component.count = count;
    component.productID = productId;
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.decrementCount();
    expect(component.count).toBe(0);
    expect(dispatchSpy).toHaveBeenCalledWith(
      deleteCartOrderAction({ id: productId })
    );
    expect(component.isCounterVisible).toBeFalse();
  });

  it('should dispatch updateCartOrderAction if count is more than 1', () => {
    const count = 2;
    component.count = count;
    const newOrder = {
      id: 1,
    };
    component.product = { id: 1 };
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.decrementCount();
    expect(component.count).toBe(count - 1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      updateCartOrderAction({ newOrder: { count: count - 1 }, id: newOrder.id })
    );
  });
});
