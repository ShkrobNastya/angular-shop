import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { deleteCartOrderAction } from '../store/actions/cart.action';
import { CartComponent } from './cart.component';
import { CART } from '../mocks/db-data';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
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
    fixture = TestBed.createComponent(CartComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch deleteCartOrderAction when user clicks on delete button', fakeAsync(() => {
    component.cart = Object.values(CART);
    fixture.detectChanges();

    const onDelete = spyOn(component, 'onDelete');
    const deleteButton = de.nativeElement.querySelectorAll('.btn-danger')[0];
    deleteButton.click();
    flush();
    expect(onDelete).toHaveBeenCalled();
  }));

  it('should dispatch deleteCartOrderAction after onDelete function call ', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.onDelete(1);
    expect(dispatchSpy).toHaveBeenCalledWith(deleteCartOrderAction({ id: 1 }));
  });
});
