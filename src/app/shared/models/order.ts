
import { IUserAddress } from "./iuser-address"

export interface IOrderToCreate {
  basketId: string
  deliveryMethodId: number
  shippingAddress: IUserAddress
}

export interface IOrder {
  id: number
  buyerEmail: string
  orderDate: string
  status: string
  shippingAddress: IUserAddress
  deliveryMethod: string
  deliveryMethodCost: number
  items: IOrderItem[]
  subTotal: number
  total: number
  paymentIntentId: string
}


export interface IOrderItem {
  id: number
  productId: number
  productName: string
  pictureUrl: string
  price: number
  quantity: number
}