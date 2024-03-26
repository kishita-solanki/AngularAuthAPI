import  { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

const routes : Routes = [
    {path : 'login', component : LoginComponent },
    {path : 'signup', component : SignupComponent},
    {path : 'dashboard', component : DashboardComponent, canActivate: [authGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}