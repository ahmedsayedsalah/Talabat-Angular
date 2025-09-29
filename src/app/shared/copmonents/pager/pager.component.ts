import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShopParams } from '../../models/ٍshop-params';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { IPaginationParams } from '../../models/ipagination-params';

@Component({
  selector: 'app-pager',
  imports: [PaginationModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.css'
})
export class PagerComponent {
@Input() params!:IPaginationParams;
@Output() pageChanged=new EventEmitter<number>();

onPageChanged(ev:any)
{
  this.pageChanged.emit(ev.page);
}
}
