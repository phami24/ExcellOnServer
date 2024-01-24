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
import { CreateEmployeeComponent } from './feature/employee/create-employee/create-employee.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { EditEmployeeComponent } from './feature/employee/edit-employee/edit-employee.component';
import { PaymentsComponent } from './feature/payments/payments.component';
import { RoomDepartmentComponent } from './feature/department/room-department/room-department.component';
import { CreateDepartmentComponent } from './feature/department/create-department/create-department.component';


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
    CreateEmployeeComponent,
    EditEmployeeComponent,
    PaymentsComponent,
    RoomDepartmentComponent,
    CreateDepartmentComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  exports:[
    SidebarComponent,
    NavbarComponent,
  ]
})
export class AdminModule { }
