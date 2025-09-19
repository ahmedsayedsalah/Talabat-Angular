import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorsComponent } from './test-errors/test-errors.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { authGuard } from './core/guards/auth.guard';
export const routes: Routes = [
    {path: "", component: HomeComponent,data: {Breadcrumb: "Home"}},
    {path: "test-errors", component: TestErrorsComponent},
    {path: "not-found", component: NotFoundComponent},
    {path: "server-error", component: ServerErrorComponent},
    {path: "shop", loadChildren: ()=> import('./shop/shop.module').then(m=> m.ShopModule)},
    {path: "basket", loadChildren: ()=> import("./basket/basket.module").then(m=> m.BasketModule)},
    {path: "account",loadChildren: ()=> import("./account/account.module").then(m=> m.AccountModule)},
    {path: "checkout", loadChildren: ()=> import("./checkout/checkout.module").then(m=> m.CheckoutModule),canActivate: [authGuard]},
    {path: "orders",loadChildren: ()=> import("./orders/orders.module").then(m=> m.OrdersModule),canActivate: [authGuard]},
    {path: "**", redirectTo: "",pathMatch: "full"}
];
