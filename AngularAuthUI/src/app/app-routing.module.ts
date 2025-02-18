import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './Components/layout/layout.component';
import { ProductComponent } from './Components/Products/product/product.component';
import { SellerComponent } from './Components/Sellers/seller/seller.component';
import { ClientComponent } from './Components/Clients/client/client.component';
import { InvoiceComponent } from './Components/invoice/invoice/invoice.component';
import { AddeditproductComponent } from './Components/Products/addeditproduct/addeditproduct.component';
import { AddeditsellerComponent } from './Components/Sellers/addeditseller/addeditseller.component';
import { AddeditclientComponent } from './Components/Clients/addeditclient/addeditclient.component';
import { CreateinvoiceComponent } from './Components/invoice/createinvoice/createinvoice.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: '',
        component: LayoutComponent, // Render the layout component for authenticated routes
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'products', component: ProductComponent },
            { path: 'addproduct', component: AddeditproductComponent },
            { path: 'editproduct/:id', component: AddeditproductComponent },
            { path: 'sellers', component: SellerComponent },
            { path: 'addseller', component: AddeditsellerComponent },
            { path: 'editseller/:id', component: AddeditsellerComponent },
            { path: 'clients', component: ClientComponent },
            { path: 'addclient', component: AddeditclientComponent },
            { path: 'editclient/:id', component: AddeditclientComponent },
            { path: 'invoice', component: InvoiceComponent },
            { path: 'createinvoice', component: CreateinvoiceComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }