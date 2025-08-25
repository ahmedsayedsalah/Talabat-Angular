import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  constructor(private ngxSpinnerService:NgxSpinnerService) {

  }

  busy(){
    this.ngxSpinnerService.show(undefined,{
    type: "square-jelly-box",
    bdColor: "rgba(255,255,255,0.7)",
    color: "#e95420"
    });
  }

  idle(){
    this.ngxSpinnerService.hide();
  }
}
