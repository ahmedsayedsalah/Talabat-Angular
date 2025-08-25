import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let router= inject(Router);
  let toastr= inject(ToastrService);
  return next(req).pipe(
    catchError(err=> {
      if(err){
        if(err.status === 400){
          if(err.error.errors){
          throw err.error; 
          }else{
          toastr.error(err.error.message, err.status.toString());
        }
          
        }
        if(err.status === 401){
          toastr.error(err.error.message, err.status.toString());
        }
        if(err.status === 404){
          router.navigateByUrl("/not-found");
        }
        if(err.status === 500){
          const navigationExtras: NavigationExtras = { state: { error: err.error } };
          console.log(err.error);
          console.log(navigationExtras);
          router.navigateByUrl("/server-error",navigationExtras);
        }
      }

      return throwError(err);
    })
  );
};
