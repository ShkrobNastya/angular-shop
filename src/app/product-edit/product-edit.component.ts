import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppStateInterface } from '../store/state.model';
import { Store } from '@ngrx/store';
import { updateProductAction } from '../store/actions/product.action';
import { ProductEditService } from './product-edit.service';
import { selectProducts } from '../store/selectors/product.selectors';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>,
    private productEditService: ProductEditService
  ) {}

  product: Product;
  id: number = this.route.snapshot.params['id'];
  editForm: FormGroup;
  isToastVisible: boolean = false;

  ngOnInit() {
    this.store.select(selectProducts).subscribe((products) => {
      this.product = products[this.id - 1];
      this.editForm = new FormGroup({
        title: new FormControl(this.product.title, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
        stock: new FormControl(this.product.stock, Validators.required),
        description: new FormControl(
          this.product.description,
          Validators.required
        ),
        image: new FormControl(this.product.image, Validators.required),
      });
    });

    this.productEditService.isToastVisible.subscribe((isVisible) => {
      this.isToastVisible = isVisible;
    });
  }

  onSubmit() {
    let newProduct: { [key: string]: string } = {};

    Object.entries(this.editForm.controls)
      .filter((el) => el[1].touched !== false)
      .forEach((el) => {
        newProduct[el[0]] = el[1].value;
      });

    this.store.dispatch(
      updateProductAction({ newProduct, id: this.product.id })
    );
  }
}
