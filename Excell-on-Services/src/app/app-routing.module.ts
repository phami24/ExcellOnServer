import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/feature/home/home.component';
import { ServicesPricingComponent } from './client/feature/services-pricing/services-pricing.component';
import { AboutComponent } from './client/feature/about/about.component';
import { PaymentsComponent } from './client/feature/payments/payments.component';
import { ReportsComponent } from './client/feature/reports/reports.component';
import { ProfileComponent } from './client/feature/profile/profile.component';
import { PaymentHistoryComponent } from './client/feature/payment-history/payment-history.component';
import { MainComponent } from './admin/feature/main/main.component';
import { LoginComponent } from './auths/components/login/login.component';
import { RegisterComponent } from './auths/components/register/register.component';

const routes: Routes = [
  {
    path:'', 
    redirectTo:'/home', 
    pathMatch: 'full'  
  },
  {
    path: 'home', 
    component: HomeComponent ,
    data: {title: 'Home page'}    
  },
  {
    path: 'login', 
    component: LoginComponent ,
    data: {title: 'Login'}    
  },
  {
    path: 'register', 
    component: RegisterComponent ,
    data: {title: 'Register'}    
  },
  {
    path: 'services', 
    component: ServicesPricingComponent , 
    data: {title: 'Service-Pricing page'}    
  },
  {
    path: 'about', 
    component: AboutComponent , 
    data: {title: 'About page'}     
  },
  {
    path: 'payment', 
    component: PaymentsComponent, 
    data: {title: 'Payment page'}     
  },
  {
    path: 'paymentHistory', 
    component: PaymentHistoryComponent, 
    data: {title: 'Pay History page'}    
  },
  {
    path: 'reports', 
    component: ReportsComponent, 
    data: {title: 'Reports page'}    
  },
  {
    path: 'profile', 
    component: ProfileComponent, 
    data: {title: 'Profile page'}     
  },
  {
    path: 'admin', 
    component: MainComponent, 
    data: {title: 'Ad page'}     
  },
  // {
  //   path: 'admin',
  //   children: [
  //     {
  //       path: 'admin',
  //       loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  //     },
      
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
