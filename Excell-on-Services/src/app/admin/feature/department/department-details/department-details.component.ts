import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Employee } from '../model/employee.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent {
  employee: Employee | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // Extract data passed to the dialog
    if (data && data.employeeId && data.departmentInfo) {
      const employeeId = data.employeeId;
      this.employee = data.departmentInfo.employees.find((emp: Employee) => emp.id === employeeId) || null;
    }
  }

}
