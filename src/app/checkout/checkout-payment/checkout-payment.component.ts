import { CdkStepperModule } from '@angular/cdk/stepper';
import {  Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { Basket } from '../../shared/models/basket';
import { IOrderToCreate } from '../../shared/models/order';
import { CheckoutService } from '../checkout.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { loadStripe,Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { IUserAddress } from '../../shared/models/iuser-address';
import { NavigationExtras, Router } from '@angular/router';
import { NgIf } from '@angular/common';

//declare var Stripe:Stripe;
@Component({
  selector: 'app-checkout-payment',
  imports: [CdkStepperModule,ReactiveFormsModule,NgIf],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css'
})
export class CheckoutPaymentComponent implements OnInit {
// pay() {
//     console.log("in pay method of checkout payment component");
//     console.log(this.checkoutForm.get('paymentForm')?.get('nameOnCard')?.value);
    
// console.log(this.cardNumberElement?.nativeElement.value);
//     console.log(this.cardExpiryElement?.nativeElement.value);
//     console.log(this.cardCvcElement?.nativeElement.value);
// }
    @Input() checkoutForm!: FormGroup;
    @ViewChild('cardNumber') cardNumberElement!: ElementRef;
    @ViewChild('cardExpiry') cardExpiryElement!: ElementRef;
    @ViewChild('cardCvc') cardCvcElement!: ElementRef;
    stripe?:Stripe;
    cardNumber?:StripeCardNumberElement;
    cardExpiry?:StripeCardExpiryElement
    cardCvc?:StripeCardCvcElement;
    cardNumberComplete=false;
    cardExpiryComplete=false;
    cardCvcComplete=false;
    cardErrors:any;
    loading=false;

    constructor(private basketService:BasketService
      ,private checkoutService:CheckoutService,
      private toastrService:ToastrService,
      private router:Router
    ){

    }
  ngOnInit(): void {
    loadStripe('pk_test_51QJxlQA8Een09rOoXIt8iu53g5jjUQNVrwLbLjL3qazHYC8saRmXdPRRKnrSiaADgTBFxaYnD26tYGBmLhh9atp000iUWQ0nQ4').
    then(stripe=>{
      this.stripe= stripe!;
      const elements= this.stripe.elements();

    this.cardNumber= elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.on('change', event=>{
        this.cardNumberComplete= event.complete;
        if(event.error)
          this.cardErrors= event.error.message;
        else
          this.cardErrors=null;
    });

    this.cardExpiry= elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.on('change', event=>{
      this.cardExpiryComplete=event.complete;
      if(event.error)
        this.cardErrors= event.error.message;
      else
        this.cardErrors=null;
    });

    this.cardCvc= elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.on('change', event=>{
      this.cardCvcComplete=event.complete;
      if(event.error)
        this.cardErrors= event.error.message;
      else
        this.cardErrors=null;
    });
    });
    
  }

  get paymentFormComplete()
    {
      return this.checkoutForm.get('paymentForm')?.valid
        && this.cardNumberComplete
        && this.cardExpiryComplete
        && this.cardCvcComplete;
    }

  async submitOrder()
  {
    this.loading=true;
    const basket= this.basketService.getCurrentBasketValue();
    if(!basket) throw new Error("basket is null");
    try{
        const order= await this.createOrder(basket!);
        const paymentResult= await this.confirmPaymentWithStripe(basket);
        if(paymentResult.paymentIntent)
        {
          this.basketService.deleteBasket(basket);
          const navigationExtras:NavigationExtras= {state:order};
          this.router.navigateByUrl('checkout/success', navigationExtras);
        }
        else{
          this.toastrService.error(paymentResult?.error?.message)
        }
    }
    catch(error:any)
    {
      console.error(error);
      this.toastrService.error(error?.message)
    }
    finally{
      this.loading=false;
    }
  }

  

  createOrder(basket: Basket) {
    if(!basket) throw new Error("basket is null");
    const orderToCreate= this.getOrderToCreate(basket);
    return firstValueFrom(this.checkoutService.createOrder(orderToCreate!));
  }

  getOrderToCreate(basket: Basket):IOrderToCreate {
    let shippingAddress= this.checkoutForm.get('addressForm')?.value as IUserAddress;
    if (!shippingAddress) throw new Error('Problem with basket');
    return {
        basketId : basket.id,
        deliveryMethodId: basket.deliveryMethodId!,
        shippingAddress: shippingAddress
    };
  }

  private async confirmPaymentWithStripe(basket?: Basket) {
    if(!basket) throw new Error("basket is null");
    const result= await this.stripe?.confirmCardPayment(basket.clientSecret,{
      payment_method: {
        card: this.cardNumber!,
        billing_details: {
          name: this.checkoutForm.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    });
    if(!result) throw new Error("Problem attempting payment with stripe");
    return result;
  }
}

