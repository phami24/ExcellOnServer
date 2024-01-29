// edit-employee.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { EmployeeService } from '../state/employee.service';
import { ToastrService } from 'ngx-toastr';


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
    private employeeService: EmployeeService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    console.log('Department from data:', this.data);

    this.empForm = this.formBuilder.group({
      id: [this.data.id],
      firstName: [this.data?.firstName || '', Validators.required],
      lastName: [this.data?.lastName || '', Validators.required],
      dob: [this.data?.dob || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      phone: [this.data?.phone || '', Validators.required],
      departmentId: [parseInt(this.data?.departmentId) || null, Validators.required],
      avatar: [this.data?.avatar?.url || '', Validators.required],
      // Thêm các trường khác của form vào đây
    });
  }
  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.empForm.patchValue({
        avatar: file,
      });
    }
  }

  onSave(): void {
    if (this.empForm.valid) {
      const updatedEmployee = this.empForm.value;

      // Tạo đối tượng FormData và thêm các trường cần thiết
      const formData = new FormData();
      formData.append('Id', updatedEmployee.id);
      formData.append('FirstName', updatedEmployee.firstName);
      formData.append('LastName', updatedEmployee.lastName);
      formData.append('Dob', updatedEmployee.dob);
      formData.append('Email', updatedEmployee.email);
      formData.append('Phone', updatedEmployee.phone);
      formData.append('DepartmentId', updatedEmployee.departmentId);
      formData.append('Avatar', updatedEmployee.avatar);

      this.employeeService.updateEmployee(formData).subscribe(
        (response) => {
          // Xử lý thành công, ví dụ: đóng hộp thoại
          this.toastr.success('Update successful!', 'Success');
          this.dialogRef.close(); // Đóng dialog khi cập nhật thành công
        },
        (error) => {
          // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
          console.error('Lỗi khi cập nhật nhân viên:', error);
          this.toastr.error('Update failed!', 'Error'); // Thêm thông báo lỗi
        }
      );
    }
  }

}
