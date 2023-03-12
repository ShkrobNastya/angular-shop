import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[stock]',
})
export class StockPresenceDirective implements AfterViewInit {
  @Input('stock') textColor: string;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.elRef.nativeElement.style.color = this.textColor;
  }
}
