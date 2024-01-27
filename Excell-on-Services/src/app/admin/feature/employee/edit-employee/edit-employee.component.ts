// edit-employee.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { EmployeeService } from '../state/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  empForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    console.log('Department from data:', this.data);

    this.empForm = this.formBuilder.group({
      firstName: [this.data?.firstName || '', Validators.required],
      lastName: [this.data?.lastName || '', Validators.required],
      dob: [this.data?.dob || '', Validators.required], 
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      phone: [this.data?.phone || '', Validators.required],
      departmentId: [this.data?.departmentId !== undefined && !isNaN(parseInt(this.data.departmentId, 10)) ? parseInt(this.data.departmentId, 10) : null, Validators.required],
      avatar: [null],
      // Thêm các trường khác của form vào đây
    });
  }
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
        // Kiểm tra xem trường avatar có tồn tại không
        if (this.empForm.get('avatar')) {
            this.empForm.patchValue({
                avatar: file,
            });
        }
    }
}


onSave(): void {
  console.log(this.empForm.value);
  if (this.empForm.valid) {
    const updatedEmployee = this.empForm.value;

    // Gọi phương thức updateEmployee từ service
    this.employeeService.updateEmployee(updatedEmployee).subscribe(
      (response) => {
        console.log('Employee updated successfully', response);
        this.dialogRef.close(); // Đóng dialog khi cập nhật thành công
      },
      (error) => {
        console.error('Error updating employee', error);
        // Xử lý lỗi, hiển thị thông báo, v.v.
      }
    );
  }
}

}
