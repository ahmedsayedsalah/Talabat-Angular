import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { IOrder } from '../shared/models/order';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderParams } from '../shared/models/order-params';
import { FormsModule } from '@angular/forms';
import { PagerComponent } from "../shared/copmonents/pager/pager.component";
import { PagingHeaderComponent } from "../shared/copmonents/paging-header/paging-header.component";
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-orders',
  imports: [NgFor, NgIf, DatePipe, CurrencyPipe,NgSelectModule,
    RouterLink, FormsModule, PagerComponent, PagingHeaderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {


  orders:IOrder[]=[];
  orderParams:OrderParams= new OrderParams();
  statusOptions=[
    { name: 'Pending...',value:'Pending'},
    { name: 'Failed',value:'PaymentFailed'},
    { name: 'Success',value:'PaymentReceived'},
  ];
  sortOptions = [
    { name: 'Date Ascending', value: 'dateAsc' },
    { name: 'Date Descending', value: 'dateDesc' },
    { name: 'Price Ascending', value: 'priceAsc' },
    { name: 'Price Descending', value: 'priceDesc' },
  ];
    constructor(private orderService:OrdersService){
      
    }
  ngOnInit(): void {
    this.getOrders();
    console.log(this.orderParams.status);
    
  }

    getOrders(){
      this.orderService.getOrdersForUser(this.orderParams).subscribe({
        next: response=> {
          this.orders=response.data;
          this.orderParams.count=response.count;
          this.orderParams.pageIndex=response.pageIndex;
          this.orderParams.pageSize=response.pageSize;
          console.log("specification params"+this.orderParams);
          console.log("orders for user"+response.data);
          console.log("count of orders for user"+response.count);
        },
        error: err=> console.error(err)
      })
    }

    onSelectStatus(status: string) {
    console.log("status: "+this.orderParams.status);
        this.orderParams.status=status;
        this.getOrders();
}

    onSelectSort(sort: string) {
    console.log("sort: "+this.orderParams.sort);
        this.orderParams.sort=sort;
        this.getOrders();
}

    onPageChanged(event: number) {
       
       
        this.orderParams.pageIndex=event;
        console.log("pageIndex: "+this.orderParams.pageIndex);
        this.getOrders();
}
}
