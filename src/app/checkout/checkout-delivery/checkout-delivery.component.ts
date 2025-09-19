import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IDeliveryMethod } from '../../shared/models/idelivery-method';
import { CheckoutService } from '../checkout.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CdkStepperModule } from "@angular/cdk/stepper";
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  imports: [NgFor, CurrencyPipe, ReactiveFormsModule, CdkStepperModule],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.css'
})
export class CheckoutDeliveryComponent {
   @Input() checkoutForm!: FormGroup;
   deliveryMethods?: IDeliveryMethod[];

   constructor(private checkoutService:CheckoutService,
        private basketService:BasketService
   ){

   }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: dm=>{
        this.deliveryMethods= dm;
      },
      error: err=> console.error(err)
    })
  }


  setShippingCost(deliveryMethod: IDeliveryMethod)
  {
    this.basketService.setShippingCost(deliveryMethod);
    console.log("shipping cost set to ", deliveryMethod);
  }
}
