import { Component, Input } from "@angular/core";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Review } from "src/app/shared/review.model";


@Component ({
  selector: "app-product-review",
  templateUrl: "./product-review.component.html",
  styleUrls: ["./product-review.component.scss"]

})
export class ProductReviewComponent {
  faUserCircle = faUserCircle;
  faStar = faStar;

  @Input() review: Review;

}
