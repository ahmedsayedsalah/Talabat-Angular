import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { BehaviorSubject, map } from 'rxjs';
import { IProduct } from '../shared/models/iproduct';
import { IDeliveryMethod } from '../shared/models/idelivery-method';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl; 
  // basket!: EventEmitter<Basket>;
  basket= new BehaviorSubject<IBasket|null>(null);
  basket$ = this.basket.asObservable();
  basketTotals= new BehaviorSubject<IBasketTotals|null>(null);
  basketTotals$= this.basketTotals.asObservable();
  // basket= new EventEmitter<Basket | null>();

  constructor(private http:HttpClient) {
    const basketId= localStorage.getItem("basket_id");
    if(basketId) this.getBasket(basketId);
  }

  createPaymentIntent()
  {
    return this.http.post<Basket>(`${this.baseUrl}/payments/${this.getCurrentBasketValue()?.id}`,{})
      .pipe(map(basket=> {
        this.basket.next(basket);
        console.log("Payment intent created successfully"
          , this.getCurrentBasketValue());
      }));
  }

  setShippingCost(deliveryMethod: IDeliveryMethod)
  {
    const basket= this.getCurrentBasketValue()?? this.createBasket();
    if(basket)
    {
    basket!.shippingCost= deliveryMethod.cost;
    basket!.deliveryMethodId= deliveryMethod.id;
    this.setBasket(basket);
    }
  }

  getBasket(id:string){
    return this.http.get<Basket>(`${this.baseUrl}/baskets?id=${id}`)
    .subscribe(
      {
        next: basket=> {
          this.basket.next(basket);
          this.basketTotals.next(this.calculateTotals());
          
        },
      error: err=> console.error("Error fetching basket", err)
      }
    );
  }

  setBasket(basket: Basket){
    return this.http.post<Basket>(`${this.baseUrl}/baskets`, basket)
    .subscribe({
      next: basket => {
          this.basket.next(basket);
          this.basketTotals.next(this.calculateTotals());
        },
      error: err => console.error("Error setting basket", err)
    });
  }

  deleteBasket(basket: IBasket){
    return this.http.delete(`${this.baseUrl}/baskets?id=${basket.id}`)
    .subscribe({
     next: () => {
        this.basket.next(null);
        this.basketTotals.next(null);
        localStorage.removeItem("basket_id");
        console.log("Basket removed successfully" );
     },
      error: err => console.error("Error removing basket", err)
    });
  }

  incrementItemQuantity(item: IBasketItem){
    const basket= this.getCurrentBasketValue();
    console.log("Current basket in incrementItemQuantity", basket);
    const foundIndex= basket?.items.findIndex(x=> x.id === item.id);
    console.log("Found index in incrementItemQuantity", foundIndex);
    
    if(foundIndex !== undefined && foundIndex !== -1){
      basket!.items[foundIndex].quantity++;
      console.log("quantity: ", basket!.items[foundIndex].quantity);
      this.setBasket(basket!);
    }
  }

  decrementItemQuantity(item: IBasketItem){
    const basket= this.getCurrentBasketValue();
    console.log("Current basket in decrementItemQuantity", basket);
    const foundIndex= basket?.items.findIndex(x=> x.id === item.id);
    console.log("id: ", item.id);
    console.log("Found index in decrementItemQuantity", foundIndex);
    if(foundIndex !== undefined && foundIndex !== -1){
      if(basket!.items[foundIndex].quantity>1)
      {
        basket!.items[foundIndex].quantity--;
        console.log("quantity: ", basket!.items[foundIndex].quantity);
      }
      else
      {
        this.removeItemFromBasket(item);
      }
      this.setBasket(basket!);
    }
  }


  removeItemFromBasket(item: IBasketItem) {
    const basket= this.getCurrentBasketValue();
    console.log("Current basket in removeItemFromBasket", basket);
    console.log("id of item to remove from basket", item.id);
    
    const foundIndex= basket?.items.findIndex(x=> x.id === item.id);
    console.log("Found index in removeItemFromBasket", foundIndex);

    
    if(foundIndex !== undefined && foundIndex !== -1){
        basket!.items= basket!.items.filter(i=> i.id !== item.id);
        console.log("Items after removal", basket!.items);
        
        if(basket!.items.length===0)
        {
          this.deleteBasket(basket!);
        }
    }
  }

  calculateTotals(){
    const basket= this.getCurrentBasketValue();
      const shipping=basket!.shippingCost;
      const subTotal= basket?.items?.reduce((a,b)=> (b.price*b.quantity)+a,0)?? 0;
      const total= subTotal + shipping;
      console.log("calculateTotals shipping cost ", basket!.shippingCost);
      return {shipping, subTotal, total};
  }

  getCurrentBasketValue() {
    return this.basket.value;
  }

  addItemToBasket(item: IProduct, quantity =1){
    console.log("Adding item to basket", item);
    const itemToAdd:IBasketItem = this.mapProductToBasketItem(item, quantity);
    console.log("BasketItem to add to basket", itemToAdd);
    const basket= this.getCurrentBasketValue() ?? this.createBasket();
    console.log("Current basket value", basket);
    console.log("Current basket items", basket?.items);
    // basket?.items.push(itemToAdd);
    if(basket)
    {
      basket.items= this.addOrUpdateItemInBasket(basket?.items||[], itemToAdd);
    }

    console.log("Current2 basket value", basket);
    this.setBasket(basket!);
  }

  private addOrUpdateItemInBasket(items: IBasketItem[], itemToAdd: IBasketItem){
    console.log("before basket items", items);
    const index=items?.findIndex(i=> i.id === itemToAdd.id);
    console.log("index found", index);
    if(index === -1){
      items?.push(itemToAdd);
    }
    else{
        items[index].quantity += itemToAdd.quantity;
    }
    console.log("after basket items", items);
    return items;
  }

  private createBasket(): Basket | null {
    const basket= new Basket();
    basket.items= [];
    localStorage.setItem("basket_id",basket.id);
    console.log("New basket created", basket);
    
    return basket;
  }

  private mapProductToBasketItem(item: IProduct, quantity: number) {
    return {
      id: item.id,
      productName: item.name,
      pictureUrl: item.pictureUrl,
      price: item.price,
      quantity,
      brand: item.productBrand,
      type: item.productType
    }
  }
}
