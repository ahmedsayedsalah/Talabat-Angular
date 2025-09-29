import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ShopParams } from '../../models/ٍshop-params';
import { IPaginationParams } from '../../models/ipagination-params';

@Component({
  selector: 'app-paging-header',
  imports: [NgIf],
  templateUrl: './paging-header.component.html',
  styleUrl: './paging-header.component.css'
})
export class PagingHeaderComponent {
  @Input() params!: IPaginationParams;


}
