import { Component, OnInit } from '@angular/core';
import { OrderTotalsComponent } from "../shared/copmonents/order-totals/order-totals.component";
import {CdkStepperModule} from '@angular/cdk/stepper';
import { StepperComponent } from '../shared/copmonents/stepper/stepper.component';
import { CheckoutAddressComponent } from "./checkout-address/checkout-address.component";
import { CheckoutDeliveryComponent } from "./checkout-delivery/checkout-delivery.component";
import { CheckoutReviewComponent } from "./checkout-review/checkout-review.component";
import { CheckoutPaymentComponent } from "./checkout-payment/checkout-payment.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { CheckoutService } from './checkout.service';
import { BasketService } from '../basket/basket.service';



@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,OrderTotalsComponent, CdkStepperModule, StepperComponent, CheckoutAddressComponent, CheckoutDeliveryComponent, CheckoutReviewComponent, CheckoutPaymentComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private accountService:AccountService,
    private basketService:BasketService
  ){
    
  }
  ngOnInit(): void {
    this.createCheckOutForm();
    this.getAddressFormValues();
    this.getDeliveryFormValues();
  }

   createCheckOutForm(){
   this.checkoutForm = this.formBuilder.group({
    addressForm: this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    }),
    deliveryForm: this.formBuilder.group({
      deliveryMethod: ['', Validators.required]
    }),
    paymentForm: this.formBuilder.group({
      nameOnCard: ['', Validators.required]
    })
  });
    
   }

   getAddressFormValues(){
      this.accountService.getUserAddress().subscribe({
        next: address=>{
          address && this.checkoutForm.get('addressForm')?.patchValue(address);
        },
        error: err=> console.error(err)
      })
  }

  getDeliveryFormValues()
  {
    const basket= this.basketService.getCurrentBasketValue();
    if(basket && basket.deliveryMethodId)
    {
      this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')
      ?.patchValue(basket.deliveryMethodId.toString());
    }
  }
}
