import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {BreadcrumbComponent, BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  imports: [BreadcrumbComponent,NgIf,AsyncPipe,TitleCasePipe],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.css'
})
export class SectionHeaderComponent {
  breadCrumbItems!:Observable<any[]>;
  constructor(private bcService: BreadcrumbService) {
    this.breadCrumbItems= bcService.breadcrumbs$;
    console.log("breadcrumbs", this.breadCrumbItems);
  }
}

