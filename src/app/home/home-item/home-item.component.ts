import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "src/app/shared/product.model";
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.scss']
})
export class HomeItemComponent{

  @Input() product: Product;
  @Input() count: number;
  @Output() delete = new EventEmitter<void>();

  faStar = faStar;
  isAddToCartBtnClicked: boolean;

  onDelete() {
    this.delete.emit();
  }
}
