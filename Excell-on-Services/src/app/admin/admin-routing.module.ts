import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './feature/main/main.component';
import { CustomerManagementComponent } from './feature/customer-management/customer-management.component';
import { AuthAdminGuard } from '../Guard/admin.guard';
import { DepartmentComponent } from './feature/department/department.component';
import { EmployeeComponent } from './feature/employee/employee.component';
import { ServicesComponent } from './feature/services/services.component';
import { CommentsComponent } from './feature/comments/comments.component';
import { ProfileAdminComponent } from './feature/profile-admin/profile-admin.component';
import { PaymentsComponent } from './feature/payments/payments.component';
import { RoomDepartmentComponent } from './feature/department/room-department/room-department.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'main',
        component: MainComponent,
        canActivate: [AuthAdminGuard],
        data: { title: 'Dashboard' },
      },
      {
        path: 'customer',
        component: CustomerManagementComponent,
        data: { title: 'Customer management' },
      },
      {
        path: 'room-department/:departmentId',
        // truyền thằng như này. nhưng mà lấy data mà truy vấn lại nhiều lần lag. Nãy gửi cho cái link ấy. đọc xong lên utube xem
        component: RoomDepartmentComponent,
        data: { title: 'Customer management' },
      },
      {
        path: 'department',
        component: DepartmentComponent,
        data: { title: 'Department' },
        // children: [                     
        //   {
        //     path: 'room-department/:departmentId',
        //     component: RoomDepartmentComponent,
        //   },
        // ],
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        data: { title: 'Employee' },
      },
      {
        path: 'services',
        component: ServicesComponent,
        data: { title: 'Services' },
      },
      {
        path: 'comments',
        component: CommentsComponent,
        data: { title: 'Comments' },
      },
      {
        path: 'profile-admin',
        component: ProfileAdminComponent,
        data: { title: 'Profile Admin' },
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        data: { title: 'Payment' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
