import { Review } from './../shared/review.model';
import { ProductDetailService } from './product-detail.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AppStateInterface } from '../store/state.model';
import { Store } from '@ngrx/store';
import { selectProducts } from '../store/selectors/product.selectors';
import { selectReviewItems } from '../store/selectors/review.selectors';
import { getReviewsAction } from '../store/actions/review.action';
import { getProductsAction } from '../store/actions/product.action';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private dataStorageService: DataStorageService,
    private productDetailService: ProductDetailService,
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>,
  ) {}

  product: Product;
  id: string = this.route.snapshot.params['id'];
  color: string;
  stockPresenceMessage: string;
  count: number;
  faStar = faStar;
  reviews: Review[];

  ngOnInit() {
    this.store.dispatch(getProductsAction({filters: ''}));

    this.store.select(selectProducts)
      .subscribe(products => {
      this.product = products.filter(product => product.id.toString() === this.id)[0];

      this.stockPresenceMessage =
          this.product?.stock > 10
            ? 'In stock'
            : this.product?.stock === 0
            ? 'Out of stock'
            : 'Almost sold out';

      this.color = this.productDetailService.getStockColor(
        this.stockPresenceMessage
      );

      this.store.dispatch(getReviewsAction({id:this.product?.id}));
    });

    this.store.select(selectReviewItems).subscribe(reviews => {
      this.reviews = reviews;
    });
  }
}
