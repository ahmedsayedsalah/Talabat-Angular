import { Component } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../models/basket';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-order-totals',
  imports: [NgIf,AsyncPipe,CurrencyPipe],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.css'
})
export class OrderTotalsComponent {
  bsketTotals$?: Observable<IBasketTotals|null>;
 constructor(private basketService: BasketService){

 }
  ngOnInit(): void {
      this.bsketTotals$= this.basketService.basketTotals$;
  }
}
