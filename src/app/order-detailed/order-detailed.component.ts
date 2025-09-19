import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders/orders.service';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from '../shared/models/order';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detailed',
  imports: [NgIf,NgFor,CurrencyPipe],
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.css'
})
export class OrderDetailedComponent implements OnInit {
   order?:IOrder;
    constructor(private ordersService:OrdersService,
      private activatedRoute: ActivatedRoute,
      private bcService:BreadcrumbService
    ){
        bcService.set("@OrderDetailed","");
    }

  ngOnInit(): void {
    this.loadOrder();
    console.log("order: "+this.order);
  }

  loadOrder(){
    let id= this.activatedRoute.snapshot.paramMap.get('id');
    
    if(id)
      this.ordersService.getOrderDetailed(+id).subscribe({
    next: order=> {
      this.order=order;
      this.bcService
      .set("@OrderDetailed",`Order# ${id} - ${order.status==='Payment Received'? 'Success'
        : order.status==='Payment Failed'? 'Failed': `${order.status}...`}`)
    },
    error: err=> console.error(err)
    });
  }
  

}
