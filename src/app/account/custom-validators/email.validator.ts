import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AccountService } from "../account.service";
import { inject } from "@angular/core";
import { map, of } from "rxjs";

/** An actor's name can't match the given regular expression */
export function DuplicatedEmailValidator(accountService:AccountService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email:string= control.value;
    return accountService.checkEmailExists(email).pipe(
        map(res=>  {
            console.log("custom validator: "+res);
            
            return res ? {emailExists: email} : null
        })
    );
    // const forbidden = nameRe.test(control.value);
    // return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}