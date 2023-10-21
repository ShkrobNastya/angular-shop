import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { REWIEWS } from 'src/app/mocks/db-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProductReviewComponent } from './product-review.component';

describe('ProductReviewComponent', () => {
  let component: ProductReviewComponent;
  let fixture: ComponentFixture<ProductReviewComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display ProductReviewComponent', () => {
    component.review = REWIEWS[0];
    fixture.detectChanges();
    const review = de.query(By.css('.review'));
    expect(review).toBeTruthy();
  });

  it('should display correct data', () => {
    component.review = REWIEWS[0];

    fixture.detectChanges();
    const review = component.review;

    const name = de.query(By.css('.review__name')),
      text = de.query(By.css('.review__text'));

    expect(name.nativeElement.textContent).toBe(review.name);
    expect(text.nativeElement.textContent).toBe(review.text);
  });
});
