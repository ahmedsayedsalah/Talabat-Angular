import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IOrder } from '../../shared/models/order';

@Component({
  selector: 'app-checkout-success',
  imports: [NgIf,RouterLink],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.css'
})
export class CheckoutSuccessComponent {
  order!:IOrder;

  constructor(private router:Router){
    const navigation = this.router.getCurrentNavigation();
    this.order = navigation?.extras?.state as IOrder
  }
}
