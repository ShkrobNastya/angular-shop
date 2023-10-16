import { Component, Input, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Review } from 'src/app/shared/review.model';
import { AppStateInterface } from 'src/app/store/state.model';
import { Store } from '@ngrx/store';
import { getReviewsAction } from 'src/app/store/actions/review.action';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss'],
})
export class ProductReviewComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}
  faUserCircle = faUserCircle;
  faStar = faStar;

  @Input() review: Review;

  ngOnInit(): void {}
}
