import { Review } from './../shared/review.model';
import { ProductDetailService } from './product-detail.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private dataStorageService: DataStorageService,
    private productDetailService: ProductDetailService,
    private route: ActivatedRoute
  ) {}

  product: Product;
  id: number = this.route.snapshot.params['id'];
  color: string;
  stockPresenceMessage: string;
  count: number;
  faStar = faStar;
  reviews: Review[];

  ngOnInit() {
    this.dataStorageService.fetchProduct(this.id).subscribe(() => {
      this.product = this.productDetailService.getProduct();
      this.stockPresenceMessage =
        this.product.stock > 10
          ? 'In stock'
          : this.product.stock === 0
          ? 'Out of stock'
          : 'Almost sold out';

      this.color = this.productDetailService.getStockColor(
        this.stockPresenceMessage
      );
    });

    this.dataStorageService.fetchReviews(this.id).subscribe(() => {
      this.reviews = this.productDetailService.getReviews();
    });
  }
}
