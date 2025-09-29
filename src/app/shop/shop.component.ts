import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/iproduct';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductItemComponent } from "./product-item/product-item.component";
import { IProductType } from '../shared/models/iproduct-type';
import { IBrand } from '../shared/models/ibrand';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ShopParams } from '../shared/models/ٍshop-params';
import { PagingHeaderComponent } from "../shared/copmonents/paging-header/paging-header.component";
import { PagerComponent } from "../shared/copmonents/pager/pager.component";
import { NgSelectModule } from '@ng-select/ng-select';


@Component({

  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ProductItemComponent,NgSelectModule,
    FormsModule, PaginationModule, NgIf, PagingHeaderComponent, PagerComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IProductType[] = [];
  params: ShopParams = new ShopParams();
  @ViewChild("search") searchItem!:ElementRef;
  
  sortOptions= [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];

  constructor(
    private shopService: ShopService
    // ,private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
    this.loadTypes();
  }

  loadProducts(){
    this.shopService.getProducts(this.params).subscribe({
      next: response => {
        this.products = response.data;
        this.params.count = response.count;
        this.params.pageIndex = response.pageIndex;
        this.params.pageSize = response.pageSize;
         console.log(this.params);
         console.log("shop count: "+response.count);
      },
      error: err => {
        console.error("Error fetching products", err);
      } 
    });
  }
  loadBrands(){
    this.shopService.getBrands().subscribe({
      next: response => {
        this.brands = [{id: 0, name: 'All'}, ...response];
        // console.log(response);
      },
      error: err => {
        console.error("Error fetching brands", err);
      } 
    });
  }
  loadTypes(){
    this.shopService.getTypes().subscribe({
      next: (response) => {
        this.types = [{id: 0, name: 'All'}, ...response];
        // console.log(response);
      },
      error: err => {
        console.error("Error fetching types", err);
      } 
    });
  }

  onSelectBrand(id: number) {
  this.params.brandId= id;
  this.params.pageIndex=1;
  this.loadProducts();
}

onSelectType(id: number) {
  this.params.typeId= id;
  this.params.pageIndex=1;
  this.loadProducts();
}
onSelectSort(sort:string)
{
    this.params.sort= sort;
    this.loadProducts();
}
onPageChanged(event:number){
  this.params.pageIndex = event;
  console.log(this.params.pageIndex);
  this.loadProducts();
}
onSerach()
{
  this.params.search=this.searchItem.nativeElement.value;
  console.log(this.params.search);
  this.params.pageIndex=1;
  this.loadProducts();
}
onReset()
{
  this.searchItem.nativeElement.value = '';
  this.params = new ShopParams();
  this.loadProducts();
}
}
