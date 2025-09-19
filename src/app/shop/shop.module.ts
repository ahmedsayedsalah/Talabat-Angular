import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes= [
  {path: "", component: ShopComponent},
  {path: ":id", component: ProductDetailsComponent,data: {breadcrumb: {alias: "ProductDetails"}}},
]

@NgModule({
  declarations: [],
  imports: [
    ShopComponent,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ShopModule { }
