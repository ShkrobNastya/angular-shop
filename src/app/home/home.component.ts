import { Cart } from './../shared/cart.model';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from '../shared/product.model';
import { HomeService } from './home.service';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../store/state.model';
import {
  deleteProductAction,
  getProductsAction,
} from '../store/actions/product.action';
import { selectProducts } from '../store/selectors/product.selectors';
import { selectCartItems } from '../store/selectors/cart.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>
  ) {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const queryParams = this.route.snapshot.queryParams;
        const queryParamsString =
          this.homeService.createQueryParams(queryParams);
        this.badgeTiles = this.homeService.createBadges(queryParams);
        for (let key in queryParams) {
          this.filtersObj[key] = queryParams[key];
        }

        this.store.dispatch(getProductsAction({ filters: queryParamsString }));
        this.products$ = this.store.select(selectProducts);
      }
    });
  }
  subscription: Subscription;
  products: Product[] = [];
  products$: Observable<any[]>;
  @ViewChild('f') slForm: NgForm;
  currentFiltersRoute: {} = {};
  filtersObj: { [key: string]: null | number | boolean } = {
    minPrice: null,
    maxPrice: null,
    minRating: null,
    maxRating: null,
    stockPresence: null,
    reviewsPresence: null,
  };
  badgeTiles: string[] = [];
  cart: Cart[] = [];

  ngOnInit() {
    this.store.select(selectCartItems).subscribe((cart) => {
      this.cart = cart;
    });
  }

  getCountById(id: number) {
    const order = this.cart.find((order) => order.id === id);
    return order?.count || 0;
  }

  onSubmit(form: NgForm) {
    const formControls = Object.entries(form.controls);
    const queryParamsObj: { [key: string]: number } = {};
    formControls
      .map((el) => ({ name: el[0], value: el[1].value }))
      .filter((el) => el.value !== '' && el.value !== false)
      .forEach((el) => {
        queryParamsObj[el.name] = el.value;
      });
    this.router.navigate(['/'], { queryParams: { ...queryParamsObj } });
  }

  onClear() {
    for (let key in this.filtersObj) {
      this.filtersObj[key] = null;
    }
    this.router.navigate([], { replaceUrl: true });
  }

  removeFilter(index: number) {
    const queryParams = this.route.snapshot.queryParams;
    const removedFilterKey = Object.keys(queryParams)[index];
    this.filtersObj[removedFilterKey] = null;
    const { [removedFilterKey]: removedFilter, ...restFilters } = queryParams;
    this.router.navigate(['/'], { queryParams: restFilters });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(id: number) {
    this.store.dispatch(deleteProductAction({ id }));
  }
}
