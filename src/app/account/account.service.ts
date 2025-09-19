import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { IUser } from '../shared/models/iuser';
import { map, Observable, ReplaySubject } from 'rxjs';
import { IUserAddress } from '../shared/models/iuser-address';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl= environment.apiUrl;

  user= new ReplaySubject<IUser|null>(1);
  user$= this.user.asObservable();
  constructor(private http:HttpClient,
              private router:Router
  ) {
    const token= localStorage.getItem("token");
    if(token) this.getCurrentUser(token);
  }

  getUserToken():Observable<string>{
    return this.user$.pipe(map(user=> user!.token));
  }

  login(values:any)
  {
    return this.http.post<IUser>(`${this.baseUrl}/accounts/login`, values)
    .pipe(
      map(user=> {
         if(user)
         {
          this.user.next(user);
          localStorage.setItem("token",user.token);
            // this.router.navigateByUrl(this.returnUrl!)
         }
      })
);
  }

  register(values:any)
  {
    return this.http.post<IUser>(`${this.baseUrl}/accounts/register`, values)
    .pipe(
      map(user=>{
        if(user)
        {
          this.user.next(user);
        localStorage.setItem("token",user.token);
        //  this.router.navigateByUrl("/shop")
        }
      })
    )
  }

  logout()
  {
    localStorage.removeItem("token");
    this.user.next(null);
    this.router.navigateByUrl("/");
  }

  checkEmailExists(email:string)
  {
    return this.http.get<boolean>(`${this.baseUrl}/accounts/emailexists?email=${email}`);
  }

  getCurrentUser(token: string)
  {
    return this.http.get<IUser>(`${this.baseUrl}/accounts`)
    .subscribe({
      next: user=> {
          this.user.next(user);
          localStorage.setItem("token",user.token);
      },
      error: err=> console.error(err)
    });
  }

  getUserAddress()
  {
    return this.http.get<IUserAddress>(`${this.baseUrl}/accounts/address`);
  }

  updateUserAddress(address:IUserAddress)
  {
    return this.http.put<IUserAddress>(`${this.baseUrl}/accounts/address`,address);
    
  }
}
