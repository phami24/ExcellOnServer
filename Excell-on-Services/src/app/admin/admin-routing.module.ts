import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './feature/main/main.component';
import { CustomerManagementComponent } from './feature/customer-management/customer-management.component';
import { AuthAdminGuard } from '../Guard/admin.guard';



const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'main',
        component: MainComponent,canActivate: [AuthAdminGuard] ,
        data: { title: 'Main' },
      },
      {
        path: 'customer',
        component: CustomerManagementComponent,
        data: { title: 'Customer management' },
      },
    ],
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
