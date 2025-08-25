import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/ipagination';
import { IBrand } from '../shared/models/ibrand';
import { map } from 'rxjs/operators';
import { IProductType } from '../shared/models/iproduct-type';
import { ShopParams } from '../shared/models/ٍShopParams';
import { IProduct } from '../shared/models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:7114/api"; 
  
  constructor(private httpClient: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params= new HttpParams();
    if(shopParams.brandId !== 0)
      params= params.append("brandId",shopParams.brandId.toString());
    if(shopParams.typeId!== 0 )
      params= params.append("typeId",shopParams.typeId.toString());
    if(shopParams.pageIndex !== 0)
    params= params.append("pageIndex",shopParams.pageIndex.toString());
    if(shopParams.pageSize !== 0)
      params= params.append("pageSize",shopParams.pageSize.toString());
if(shopParams.search)
      params= params.append("search",shopParams.search.toString());

      params= params.append("sort",shopParams.sort.toString());
      

    return this.httpClient.get<IPagination>(`${this.baseUrl}/Products`
      ,{params});
  }

  getProduct(id: number){
    return this.httpClient.get<IProduct>(`${this.baseUrl}/Products/${id}`);
  }

  getBrands() {
    return this.httpClient.get<IBrand[]>(`${this.baseUrl}/Products/brands`);
  }
  getTypes() {
    return this.httpClient.get<IProductType[]>(`${this.baseUrl}/Products/types`);
  }
}
