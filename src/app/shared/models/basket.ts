import { v4 as uuidv4} from "uuid";

export interface IBasket {
  id: string
  items: IBasketItem[]
  paymentIntentId: string
  clientSecret: string
  deliveryMethodId: number
  shippingCost: number
}

export interface IBasketItem {
  id: number
  productName: string
  pictureUrl: string
  price: number
  quantity: number
  brand: string
  type: string
}

export class Basket implements IBasket{
    id= uuidv4();
    items: IBasketItem[]= [];
    paymentIntentId= "";
    clientSecret= "";
    deliveryMethodId=0;
    shippingCost= 0;
}

export interface IBasketTotals{
  subTotal:number;
  shipping:number;
  total:number;
}
