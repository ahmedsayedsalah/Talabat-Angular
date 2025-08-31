import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../shared/models/iuser';
import { BehaviorSubject, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl= "https://localhost:7114/api";

  user= new BehaviorSubject<IUser|null>(null);
  user$= this.user.asObservable();
  constructor(private http:HttpClient,
              private router:Router
  ) {
    const token= localStorage.getItem("token");
    if(token) this.getCurrentUser(token);
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
    var headers= new HttpHeaders();
    headers=headers.set("Authorization",`Bearer ${token}`)
    return this.http.get<IUser>(`${this.baseUrl}/accounts`,{headers})
    .subscribe({
      next: user=> {
          this.user.next(user);
          localStorage.setItem("token",user.token);
      },
      error: err=> console.error(err)
    });
  }
}
