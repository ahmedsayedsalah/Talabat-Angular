import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ShopService } from '../shop/shop.service';
import { ShopParams } from '../shared/models/ٍShopParams';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  brandsCount= 0;
  typesCount= 0;
  productsCount=0;
  constructor(private shopService:ShopService){}

  ngOnInit(): void {

    this.shopService.getBrands().subscribe({
      next: brands=> this.brandsCount= brands.length,
      error: err=> console.error(err)
    });

    this.shopService.getTypes().subscribe({
      next: tyeps=> this.typesCount= tyeps.length,
      error: err=> console.error(err)
    });

    this.shopService.getProducts(new ShopParams()).subscribe({
      next: products=> this.productsCount=products.count,
      error: err=> console.error(err)
    })
  }


}
