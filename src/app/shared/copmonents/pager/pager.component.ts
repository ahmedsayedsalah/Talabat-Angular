import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShopParams } from '../../models/ٍShopParams';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pager',
  imports: [PaginationModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.css'
})
export class PagerComponent {
@Input() params!:ShopParams;
@Output() pageChanged=new EventEmitter<number>();

onPageChanged(ev:any)
{
  this.pageChanged.emit(ev.page);
}
}
