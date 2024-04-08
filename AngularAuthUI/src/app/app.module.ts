import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { BodyComponent } from './Components/body/body.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { ProductComponent } from './Components/Products/product/product.component';
import { ClientComponent } from './Components/Clients/client/client.component';
import { SellerComponent } from './Components/Sellers/seller/seller.component';
import { InvoiceComponent } from './Components/invoice/invoice/invoice.component';
import { AddeditproductComponent } from './Components/Products/addeditproduct/addeditproduct.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddeditsellerComponent } from './Components/Sellers/addeditseller/addeditseller.component';
import { AddeditclientComponent } from './Components/Clients/addeditclient/addeditclient.component';
import { CreateinvoiceComponent } from './Components/invoice/createinvoice/createinvoice.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    SidenavComponent,
    BodyComponent,
    LayoutComponent,
    ProductComponent,
    ClientComponent,
    SellerComponent,
    InvoiceComponent,
    AddeditproductComponent,
    AddeditsellerComponent,
    AddeditclientComponent,
    CreateinvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
