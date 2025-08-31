import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../account.service';
import { IUserRegister } from '../../shared/models/iuser-register';
import { JsonPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { DuplicatedEmailValidator } from '../custom-validators/email.validator';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule,JsonPipe,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  userRegsForm!:FormGroup;
constructor(private formBuilder:FormBuilder
  ,private accountService:AccountService
  ,private router:Router
){

}
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm()
  {
    this.userRegsForm= this.formBuilder.group({
      email:["",[Validators.required,Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]
    ,DuplicatedEmailValidator(this.accountService)],
      password:["",[Validators.required,Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$")]],
      displayName:["",Validators.required],
      phoneNumber:["",[Validators.required,Validators.pattern("^(\\+201|01|00201)[0-2,5]{1}[0-9]{8}")]],
    })
  }

  get Email()
  {
    return this.userRegsForm.get("email");
  }
  get Password()
  {
    return this.userRegsForm.get("password");
  }
  get DisplayName()
  {
    return this.userRegsForm.get("displayName");
  }
  get PhoneNumber()
  {
    return this.userRegsForm.get("phoneNumber");
  }

  onSubmit() {
    var user= this.userRegsForm.value as IUserRegister;
    console.log(user);
    this.accountService.register(user).subscribe({
      next: user=> {
        console.log("user register successfully")
        this.router.navigateByUrl("/shop");
      },
      error: err=> console.log(err)
    })
}

}
