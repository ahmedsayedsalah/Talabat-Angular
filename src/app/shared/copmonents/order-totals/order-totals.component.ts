import { Component, Input } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable, of } from 'rxjs';
import { IBasketTotals } from '../../models/basket';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-order-totals',
  imports: [NgIf,AsyncPipe,CurrencyPipe],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.css'
})
export class OrderTotalsComponent {
  basketTotals$?: Observable<IBasketTotals|null>;
  @Input() subTotal?: number;
  @Input() shipping?: number;
  @Input() total?: number;
 constructor(private basketService: BasketService){
  console.log("constructor: ");
  
    console.log("subTotal "+this.subTotal);
    console.log("shipping "+this.shipping);
    console.log("total "+this.total);
    
 }
  ngOnInit(): void {
    console.log("init: ");
    console.log("subTotal "+this.subTotal);
    console.log("shipping "+this.shipping);
    console.log("total "+this.total);
      if (this.subTotal !== undefined || this.shipping !== undefined || this.total !== undefined) {
      const totals: IBasketTotals = {
        subTotal: this.subTotal || 0,
        shipping: this.shipping || 0,
        total: this.total || 0
      };
      this.basketTotals$ = of(totals);
    } else {
      this.basketTotals$= this.basketService.basketTotals$;
    }
  }
}
