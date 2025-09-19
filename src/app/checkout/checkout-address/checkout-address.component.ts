import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUserAddress } from '../../shared/models/iuser-address';
import { AccountService } from '../../account/account.service';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/iuser';
import { RouterLink } from '@angular/router';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-checkout-address',
  imports: [ReactiveFormsModule, RouterLink,CdkStepperModule,NgIf],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.css'
})
export class CheckoutAddressComponent{
    
    @Input() checkoutForm!: FormGroup;

    constructor(private accountService:AccountService
      ,private toastrService:ToastrService
    ){}

  get FName()
  {
    return this.checkoutForm.get('addressForm.fName');
  }

  get LName()
  {
    return this.checkoutForm.get('addressForm.lName');
  }

  get Street()
  {
    return this.checkoutForm.get('addressForm.street');
  }
  get City()
  {
    return this.checkoutForm.get('addressForm.city');
  }

  get Country()
  {
    return this.checkoutForm.get('addressForm.country');
  }

    saveUserAddress(){
        
        let userAddress= this.checkoutForm.get('addressForm')?.value as IUserAddress;
        this.accountService.updateUserAddress(userAddress)
        .subscribe({
            next: address=> {
                this.toastrService.success("Address Saved");
                this.checkoutForm.get('addressForm')?.reset(address);
            },
            error: err=> console.error("failed to save address",err)
        });
    }

    // getUserAddress(){
    //   this.accountService.getUserAddress().subscribe({
    //     next: address=> {
    //       if(address)
    //       {
    //         this.checkoutForm.get('addressForm')?.patchValue(address);
    //       }
    //     },
    //     error: err=> console.error(err)
    //   })
    // }
}
