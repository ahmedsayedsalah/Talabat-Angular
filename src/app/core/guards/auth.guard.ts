import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { inject } from '@angular/core';
import { map, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService= inject(AccountService);
  const router= inject(Router);

  return accountService.user$.pipe(
    map(user=>{
    if(user) return true;
    // router.navigate(["/account/login"],{queryParams: {returnUrl: state.url}});
    // return false;
    
    return router.createUrlTree(
          ['/account/login'],
          { queryParams: { returnUrl: state.url } }
        );
  }));
};

