import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { environment } from '../../environments/environment.development';
import { IPagination } from '../shared/models/ipagination';
import { OrderParams } from '../shared/models/order-params';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
    baseUrl = environment.apiUrl; 
  constructor(private httpClient:HttpClient) {

  }

  getOrdersForUser(orderParams:OrderParams)
  {
    var params= new HttpParams();
    if(orderParams.status)
      params= params.append("status",orderParams.status.toString());
    if(orderParams.sort)
      params= params.append("sort",orderParams.sort.toString());
    if(orderParams.pageIndex!=0)
      params=params.append("pageIndex",orderParams.pageIndex.toString());
    if(orderParams.pageSize!=0)
      params=params.append("pageSize",orderParams.pageSize.toString());
    
    return this.httpClient.get<IPagination<IOrder>>(`${this.baseUrl}/orders`,{params});
  }

  getOrderDetailed(id: number)
  {
    return this.httpClient.get<IOrder>(`${this.baseUrl}/orders/${id}`);
  }
}
