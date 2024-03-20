import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminfindComponent } from './component/Admin/adminfind/adminfind.component';
import { AdminloginComponent } from './component/Admin/adminlogin/adminlogin.component';
import { AdminmenuComponent } from './component/Admin/adminmenu/adminmenu.component';
import { AdminserachComponent } from './component/Admin/adminserach/adminserach.component';
import { AdminwelcomeComponent } from './component/Admin/adminwelcome/adminwelcome.component';


import { ListAccComponent } from './component/Admin/list-acc/list-acc.component';
import { ListusersComponent } from './component/Admin/listusers/listusers.component';
import { SoldComponent } from './component/Admin/sold/sold.component';
import { BuyComponent } from './component/buy/buy.component';
import { BuynowComponent } from './component/buynow/buynow.component';
import { CartComponent } from './component/cart/cart.component';
import { CartpurchaseComponent } from './component/cartpurchase/cartpurchase.component';
import { CreateaccountComponent } from './component/createaccount/createaccount.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotpassComponent } from './component/forgotpass/forgotpass.component';
import { HistoryComponent } from './component/history/history.component';

import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/logout/logout.component';
import { OrdersComponent } from './component/orders/orders.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SearchComponent } from './component/search/search.component';
import { RouteguardService } from './service/routeguard.service';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'createaccount',component:CreateaccountComponent},
  {path:'profile/:id',component:ProfileComponent,canActivate:[RouteguardService]},
  {path:'dashboard/:id',component:DashboardComponent,canActivate:[RouteguardService]},
  {path:'logout',component:LogoutComponent},
  {path:'adminlogin',component:AdminloginComponent},
  {path:'list-acc/:name',component:ListAccComponent},
  {path:'adminmenu',component:AdminmenuComponent},
  {path:'adminfind/:productId',component:AdminfindComponent},
  {path:'adminwelcome/:name',component:AdminwelcomeComponent},
  {path:'search/:id/:pname',component:SearchComponent,canActivate:[RouteguardService]},
  {path:'listusers/:name',component:ListusersComponent},
  {path:'buy/:id/:aid',component:BuyComponent,canActivate:[RouteguardService]},
  {path:'buynow/:pid/:aid/:total/:qun',component:BuynowComponent,canActivate:[RouteguardService]},
  {path:'cart/:aid',component:CartComponent,canActivate:[RouteguardService]},
  {path:'orders/:qun/:total/:aid/:pid',component:OrdersComponent,canActivate:[RouteguardService]},
  {path:'history/:id',component:HistoryComponent,canActivate:[RouteguardService]},
  {path:'sold/:name',component:SoldComponent},
  {path:'adminserach/:id',component:AdminserachComponent},
  {path:'cartpurchase/:aid/:str',component:CartpurchaseComponent,canActivate:[RouteguardService]},
  {path:'forgotpass',component:ForgotpassComponent}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
