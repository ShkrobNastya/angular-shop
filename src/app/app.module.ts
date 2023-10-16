import { RewiewsEffect } from './store/effects/review.effect';
import { ProductsEffect } from './store/effects/product.effect';
import { CartEffect } from './store/effects/cart.effect';
import { LoginEffect } from 'src/app/store/effects/login.effect';
import { AuthComponent } from './auth/auth.component';
import { CartService } from './cart/cart.service';
import { CartComponent } from './cart/cart.component';
import { ProductDetailService } from './product-detail/product-detail.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeItemComponent } from './home/home-item/home-item.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockPresenceDirective } from './shared/stock-presence.directive';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductReviewComponent } from './product-detail/product-review/product-review.component';
import { AddToCartButtonComponent } from './shared/addToCart-button/addToCart-button.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RegisterEffect } from 'src/app/store/effects/register.effect';
import { reducer as authReducer } from 'src/app/store/reducers/auth.reducer';
import { reducer as cartReducer } from 'src/app/store/reducers/cart.reducer';
import { reducer as productsReducer } from 'src/app/store/reducers/product.reducer';
import { reducer as reviewsReducer } from 'src/app/store/reducers/review.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LogoutEffect } from './store/effects/logout.effect';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeItemComponent,
    HomeComponent,
    ProductDetailComponent,
    StockPresenceDirective,
    ProductEditComponent,
    CartComponent,
    AuthComponent,
    ProductReviewComponent,
    AddToCartButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    EffectsModule.forRoot([
      RegisterEffect,
      LoginEffect,
      LogoutEffect,
      CartEffect,
      ProductsEffect,
      RewiewsEffect,
    ]),
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('products', productsReducer),
    StoreModule.forFeature('cart', cartReducer),
    StoreModule.forFeature('reviews', reviewsReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [HomeService, ProductDetailService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
