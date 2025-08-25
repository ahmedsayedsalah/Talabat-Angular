import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { IProduct } from '../../shared/models/iproduct';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../../shared/models/basket';

@Component({
  selector: 'app-product-details',
  imports: [NgIf,CurrencyPipe,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {


  product!:IProduct;
  basket?: Observable<IBasket|null>;
  quantity=1;
constructor(private productService: ShopService
  ,private activatedRoute: ActivatedRoute,
  private bcService: BreadcrumbService,
  private basketService: BasketService
)
{
  bcService.set("@ProductDetails","");
}
  ngOnInit(): void {
    this.product= this.loadProduct();
    this.basket= this.basketService.basket;
    this.quantity= this.basketService.getCurrentBasketValue()?.items.find(i=> i.id=== this.product?.id)?.quantity || 1;
    console.log("basket: ", this.basket);
    console.log("product id: ", this.product?.id);
    console.log("quantity: **",this.quantity);
    
  }

incrementQuantity(){
  this.quantity++;
}

decrementQuantity(){
  if(this.quantity>1)
  {
    this.quantity--;
  }
}

addProductToBasket(){
  this.basketService.addItemToBasket(this.product,this.quantity);
}

loadProduct(){
  let id = this.activatedRoute.snapshot.paramMap.get('id');
  if(id)
  {
    this.productService.getProduct(+id).subscribe({
      next: product => {
        this.product=product;
        this.bcService.set("@ProductDetails",product.name);
      },
      error: err => {
        console.error("Error fetching product details", err);
      }
    });
  }
  else{
    console.error("Product ID is not provided in the route.");
  }

  return this.product;
}

// onDecreaseQuantity(basket: IBasket) {

//   if(!basket.items){
//   return 0;
//  }

// const item= basket.items.find(item=> item.id===this.product.id);

// item.quantity = item.quantity-1;
// }

}
