import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/models/basket';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,RouterLinkActive,NgIf,AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  basket?: Observable<IBasket|null>;
  constructor(private basketService:BasketService){

  }
  ngOnInit(): void {
    this.basket= this.basketService.basket;
  }
}
