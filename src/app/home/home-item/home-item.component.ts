import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.scss'],
})
export class HomeItemComponent implements OnInit {
  @Input() product: Product;
  @Input() count: number;
  @Output() delete = new EventEmitter<void>();

  faStar = faStar;
  isAddToCartBtnClicked: boolean;
  isAuthed: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.isAuthed = isLoggedIn)
    );
  }

  onDelete() {
    this.delete.emit();
  }
}
