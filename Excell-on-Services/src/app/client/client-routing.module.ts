import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { ServicesPricingComponent } from './feature/services-pricing/services-pricing.component';
import { AboutComponent } from './feature/about/about.component';
import { PaymentsComponent } from './feature/payments/payments.component';
import { PaymentHistoryComponent } from './feature/payment-history/payment-history.component';
import { ReportsComponent } from './feature/reports/reports.component';
import { ProfileComponent } from './feature/profile/profile.component';
import { AuthClientGuard } from '../Guard/client.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Home page' },
      },
      {
        path: 'services',
        component: ServicesPricingComponent,
        data: { title: 'Service-Pricing page' },
      },
      {
        path: 'about',
        component: AboutComponent,
        data: { title: 'About page' },
      },
      {
        path: 'payment',
        component: PaymentsComponent,canActivate: [AuthClientGuard] ,
        data: { title: 'Payment page' },
      },
      {
        path: 'paymentHistory',
        component: PaymentHistoryComponent,canActivate: [AuthClientGuard] ,
        data: { title: 'Pay History page' },
      },
      {
        path: 'reports',
        component: ReportsComponent,
        data: { title: 'Reports page' },canActivate: [AuthClientGuard] ,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Profile page' },canActivate: [AuthClientGuard] ,
      },
      
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
