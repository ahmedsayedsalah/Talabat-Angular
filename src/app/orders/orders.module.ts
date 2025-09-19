import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { OrderDetailedComponent } from '../order-detailed/order-detailed.component';

const routes=[
  {path: "",component: OrdersComponent},
  {path: ":id",component: OrderDetailedComponent,data:{breadcrumb:{alias:"OrderDetailed"}}},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrdersModule { }
