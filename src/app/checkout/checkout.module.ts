import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';

const routes= [
  {path: "", component: CheckoutComponent},
  {path: "success", component: CheckoutSuccessComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CheckoutModule { }
