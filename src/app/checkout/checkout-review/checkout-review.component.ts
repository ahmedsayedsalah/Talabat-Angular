import { Component, Input, input } from '@angular/core';
import { BasketSummaryComponent } from "../../shared/copmonents/basket-summary/basket-summary.component";
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-review',
  imports: [BasketSummaryComponent,CdkStepperModule],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.css'
})
export class CheckoutReviewComponent {
  @Input() appStepper?: CdkStepper; 
  constructor(private basketService:BasketService
    ,private toastrService:ToastrService
  ){
  }

createPaymentIntent() {
  this.basketService.createPaymentIntent()
  .subscribe({
    next: ()=> {
      this.appStepper?.next();
    },
    error: err=>{
        this.toastrService.error("error creating payment intent");
    }
  })
}

}
