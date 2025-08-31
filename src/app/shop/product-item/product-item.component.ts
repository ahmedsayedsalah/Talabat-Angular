import { Component, Input, input } from '@angular/core';
import { IProduct } from '../../shared/models/iproduct';
import { APP_BASE_HREF, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!:IProduct;
  constructor(private basketService: BasketService){

  }

  addItemToBasket(){
    console.log("Product to add to basket", this.product);
    console.log("basket status", this.basketService.basket$);
    this.basketService.addItemToBasket(this.product);
  }
}
