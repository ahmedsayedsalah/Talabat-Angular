import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusyService } from '../services/busy.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let ngxSpinnerService= inject(BusyService);
  if(!req.url.includes("emailexists"))
  {
    ngxSpinnerService.busy();
  }
  return next(req).pipe(
    delay(1000),
    finalize(()=>{
      ngxSpinnerService.idle();
    })
  );
};
