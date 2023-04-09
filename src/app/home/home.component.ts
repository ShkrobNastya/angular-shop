import { Cart } from './../shared/cart.model';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Product } from '../shared/product.model';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private dataStorageService: DataStorageService,
    private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute
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
        this.dataStorageService
          .filterProducts(queryParamsString)
          .subscribe(() => {
            this.products = this.homeService.getProducts();
          });
      }
    });
  }
  subscription: Subscription;
  products: Product[] = [];
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
    this.dataStorageService.fetchCart().subscribe((el) => {
      this.cart = el;
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
    this.dataStorageService.deleteProduct(id).subscribe(() => {
      this.dataStorageService.fetchProducts().subscribe(() => {
        this.products = this.homeService.getProducts();
      });
    });
  }
}
