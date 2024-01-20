import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentComponent } from './feature/department/department.component';
import { EmployeeComponent } from './feature/employee/employee.component';
import { ServicesComponent } from './feature/services/services.component';
import { CommentsComponent } from './feature/comments/comments.component';
import { ProfileAdminComponent } from './feature/profile-admin/profile-admin.component';
import { PaymentsComponent } from './feature/payments/payments.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    SidebarComponent,
    NavbarComponent,
    DepartmentComponent,
    EmployeeComponent,
    ServicesComponent,
    CommentsComponent,
    ProfileAdminComponent,
    PaymentsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
  ],
  exports:[
    SidebarComponent,
    NavbarComponent,
  ]
})
export class AdminModule { }
