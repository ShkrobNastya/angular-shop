import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeItemComponent } from './home-item.component';
import { AppModule } from 'src/app/app.module';
import { PRODUCTS } from 'src/app/mocks/db-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeItemComponent', () => {
  let component: HomeItemComponent;
  let fixture: ComponentFixture<HomeItemComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeItemComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display HomeItemComponent', () => {
    component.product = PRODUCTS['1'];
    fixture.detectChanges();
    const product = de.query(By.css('.product'));
    expect(product).toBeTruthy();
  });

  it('should display correct data', () => {
    component.product = PRODUCTS['1'];

    fixture.detectChanges();
    const product = component.product;

    const title = de.query(By.css('h5')),
      price = de.query(By.css('.price')),
      image = de.query(By.css('img'));
    expect(title.nativeElement.textContent).toBe(product.title);
    expect(price.nativeElement.textContent).toBe(product.price + '$');
    expect(image.nativeElement.src).toBe(product.image);
  });
});
