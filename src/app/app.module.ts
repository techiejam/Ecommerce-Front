import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {  Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProfileComponent } from './component/profile/profile.component';
import { CreateaccountComponent } from './component/createaccount/createaccount.component';
import { LogoutComponent } from './component/logout/logout.component';

import { AdminloginComponent } from './component/Admin/adminlogin/adminlogin.component';
import { ListAccComponent } from './component/Admin/list-acc/list-acc.component';

import { AdminmenuComponent } from './component/Admin/adminmenu/adminmenu.component';
import { AdminfooterComponent } from './component/Admin/adminfooter/adminfooter.component';
import { AdminlogoutComponent } from './component/Admin/adminlogout/adminlogout.component';
import { AdminfindComponent } from './component/Admin/adminfind/adminfind.component';
import { UserdataService } from './service/data/userdata.service';
import { AdminwelcomeComponent } from './component/Admin/adminwelcome/adminwelcome.component';
import { SearchComponent } from './component/search/search.component';
import { ListusersComponent } from './component/Admin/listusers/listusers.component';
import { BuyComponent } from './component/buy/buy.component';
import { BuynowComponent } from './component/buynow/buynow.component';
import { CartComponent } from './component/cart/cart.component';
import { FooterComponent } from './component/footer/footer.component';
import { OrdersComponent } from './component/orders/orders.component';
import { HistoryComponent } from './component/history/history.component';
import { SoldComponent } from './component/Admin/sold/sold.component';
import { AdminserachComponent } from './component/Admin/adminserach/adminserach.component';
import { CartpurchaseComponent } from './component/cartpurchase/cartpurchase.component';
import { ForgotpassComponent } from './component/forgotpass/forgotpass.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    MenuComponent,
    DashboardComponent,
    ProfileComponent,
    CreateaccountComponent,
    LogoutComponent,
    AdminloginComponent,
    ListAccComponent,
    AdminlogoutComponent,
    AdminmenuComponent,
    AdminfooterComponent,
    AdminfindComponent,
    AdminwelcomeComponent,
    SearchComponent,
    ListusersComponent,
    BuyComponent,
    BuynowComponent,
    CartComponent,
    FooterComponent,
    OrdersComponent,
    HistoryComponent,
    SoldComponent,
    AdminserachComponent,
    CartpurchaseComponent,
    ForgotpassComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [UserdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
