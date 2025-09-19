import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeliveryMethod } from '../shared/models/idelivery-method';
import { map } from 'rxjs';
import { IOrder, IOrderToCreate } from '../shared/models/order';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl= environment.apiUrl;
  constructor(private http:HttpClient) { }

  getDeliveryMethods()
  {
    return this.http.get<IDeliveryMethod[]>(`${this.baseUrl}/orders/deliveryMethods`)
    .pipe(map(md=> {
          return md.sort((a, b) => a.cost - b.cost);
    }));
  }

  createOrder(order: IOrderToCreate)
  {
    return this.http.post<IOrder>(`${this.baseUrl}/orders`,order);
  }
}
