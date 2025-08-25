import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-test-errors',
  imports: [NgFor,NgIf],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  baseUrl = "https://localhost:7114/api";
  validationErrors!: string[];

  constructor(private httpClient:HttpClient
    ,private router:Router){
  }

get500Error(){
    this.httpClient.get(`${this.baseUrl}/Bugy/servererror`).subscribe(
      {
        next: response => console.log(response),
        error: err => console.log(err)
      }
    )
  }

  get400Error(){
    this.httpClient.get(`${this.baseUrl}/Bugy/badrequest`).subscribe(
      {
        next: response => console.log(response),
        error: err => console.log(err)
      }
    )
  }


  get404Error(){
    this.httpClient.get(`${this.baseUrl}/Bugy/notfound`).subscribe(
      {
        next: response => console.log(response),
        error: err => console.log(err)
      }
    )
  }

  getValidationErrors(){
    this.httpClient.get(`${this.baseUrl}/products/fortwo`).subscribe({
    next: response=> console.log(response),
    error: err=> {
      console.log(err);
      this.validationErrors= err.errors;
    }
    });
  }
}
