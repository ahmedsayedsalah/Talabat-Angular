import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { IOrder } from '../shared/models/order';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [NgFor,NgIf,DatePipe,CurrencyPipe,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders:IOrder[]=[];
    constructor(private orderService:OrdersService){
      
    }
  ngOnInit(): void {
    this.getOrders();
  }

    getOrders(){
      this.orderService.getOrdersForUser().subscribe({
        next: orders=> {
          this.orders=orders
          console.log("orders for user"+orders);
        },
        error: err=> console.error(err)
      })
    }
}
