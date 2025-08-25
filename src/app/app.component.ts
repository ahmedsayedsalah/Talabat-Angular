import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./core/nav-bar/nav-bar.component";
import { SectionHeaderComponent } from './core/section-header/section-header.component';
import { NgxSpinnerModule} from "ngx-spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, SectionHeaderComponent,NgxSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  
  title = 'ECommerceFrontend';

}
