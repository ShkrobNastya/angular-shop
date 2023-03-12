import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailService } from './../product-detail/product-detail.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit } from "@angular/core";
import { Product } from '../shared/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component ({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.scss"]

})
export class ProductEditComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService, private productDetailService: ProductDetailService,
    private route: ActivatedRoute, private router: Router) {}

  product: Product;
  id: number = this.route.snapshot.params['id'];
  editForm: FormGroup;
  isToastVisible: boolean = false;


  ngOnInit() {

    this.dataStorageService.fetchProduct(this.id).subscribe(
      () => {
        this.product = this.productDetailService.getProduct();
        this.editForm = new FormGroup({
          'title': new FormControl(this.product.title, Validators.required),
          'price': new FormControl(this.product.price, Validators.required),
          'stock': new FormControl(this.product.stock, Validators.required),
          'description': new FormControl(this.product.description, Validators.required),
          'image':  new FormControl(this.product.image, Validators.required)
        });
      }
    );
  }

  onSubmit() {
    let newProduct: {[key: string]: string} = {};

    Object.entries(this.editForm.controls).filter(el => el[1].touched !== false).forEach(el => {
      newProduct[el[0]] = el[1].value;
    });
    this.dataStorageService.updateProduct(newProduct, this.product.id).subscribe(
      () => {
        this.product = this.productDetailService.getProduct();
        this.isToastVisible = true;
        setTimeout(()=>{this.isToastVisible = false;}, 500);
        setTimeout(()=>{this.router.navigate(['/']);}, 500);


      }
    );
  }

}
