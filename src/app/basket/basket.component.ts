import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderTotalsComponent } from "../shared/copmonents/order-totals/order-totals.component";
import { BasketSummaryComponent } from "../shared/copmonents/basket-summary/basket-summary.component";

@Component({
  selector: 'app-basket',
  imports: [NgIf, AsyncPipe, RouterLink, OrderTotalsComponent, BasketSummaryComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit {

  basket$?: Observable<IBasket|null>;
 constructor(public basketService: BasketService) {
    
  }
  ngOnInit(): void {
    this.basket$= this.basketService.basket$;
  }

  incrementItemQuantity(item: IBasketItem){
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }

  removeItemFromBasket(item: IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }
}
