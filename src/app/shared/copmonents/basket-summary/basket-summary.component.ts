import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../../models/basket';
import { BasketService } from '../../../basket/basket.service';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basket-summary',
  imports: [RouterLink,NgFor,NgIf,CurrencyPipe,AsyncPipe],
  templateUrl: './basket-summary.component.html',
  styleUrl: './basket-summary.component.css'
})
export class BasketSummaryComponent implements OnInit {
  @Input("") basket$?: Observable<IBasket|null>;
  @Output() increment= new EventEmitter<IBasketItem>();
  @Output() decrement= new EventEmitter<IBasketItem>();
  @Output() remove= new EventEmitter<IBasketItem>();
  @Input() isBasket= true;

  constructor(private basketService: BasketService){
  }
  ngOnInit(): void {
      this.basket$= this.basketService.basket$;
  }

  incrementItemQuantity(item: IBasketItem){
    this.increment.emit(item);
  }
  decrementItemQuantity(item: IBasketItem){
    this.decrement.emit(item);
  }
  removeItemFromBasket(item: IBasketItem){
    this.remove.emit(item);
  }
}
