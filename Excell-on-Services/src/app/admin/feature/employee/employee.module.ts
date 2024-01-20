import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule và ReactiveFormsModule
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Thêm ReactiveFormsModule vào imports
    NgxPaginationModule,
  ]
})
export class EmployeeModule { }
