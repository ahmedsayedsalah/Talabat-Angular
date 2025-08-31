import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IUserLogin } from '../../shared/models/iuser-login';
import { JsonPipe, NgIf } from '@angular/common';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,FormsModule,JsonPipe,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  userLoginForm!:FormGroup;
  returnUrl?:string;
constructor(private formBuilder:FormBuilder,
  private accountService:AccountService,
  private router:Router,
  private route:ActivatedRoute
){

}
  ngOnInit(): void {
    this.returnUrl=this.route.snapshot.queryParams['returnUrl'] || "/shop";
    this.createLoginForm();
  }

  createLoginForm()
  {
    this.userLoginForm= this.formBuilder.group({
  password: ["",[Validators.required,Validators.minLength(6)]], 
  email: ["",[Validators.required,Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]],
    });
  }

  get Email()
  {
    return this.userLoginForm.get("email");
  }

  get Password()
  {
    return this.userLoginForm.get("password");
  }


  onSubmit() {
  var user= this.userLoginForm.value as IUserLogin;
  console.log(user);
  this.accountService.login(user).subscribe({
    next: user=> {
      console.log("user login successfully")
      this.router.navigateByUrl(this.returnUrl!);
    },
    error: err=> console.error("login failed",err)
  })
}

}
