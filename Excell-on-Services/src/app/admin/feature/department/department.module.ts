import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RoomDepartmentComponent } from './room-department/room-department.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  schemas: [NO_ERRORS_SCHEMA],

  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    NgxPaginationModule,
    MatDialogModule
  ]
})
export class EmployeeModule { }
