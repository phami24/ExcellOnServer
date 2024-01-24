import { Component, EventEmitter, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './create-employee.service';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{
  // employee: any = {}; // Add this line
  // @Input() data: any;
  empForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<CreateEmployeeComponent>, private formBuilder: FormBuilder, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dobControl: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      password: ['', Validators.required],
      avatar: [''], // Thêm trường avatar vào FormGroup
    });
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.empForm.patchValue({
        avatar: file,
      });
    }
  }

  createEmployee(): void {
    console.log('Giá trị của form:', this.empForm.value);
    if (this.empForm.valid) {
      // Lấy dữ liệu từ form
      const formData = this.empForm.value;
  
      // Chuyển đổi ngày sinh thành định dạng chuẩn (nếu cần)
      formData.dobControl = formData.dobControl.toISOString();
  
      // Gọi service để tạo nhân viên
      this.employeeService.createEmployee(formData).subscribe(
        (response) => {
          console.log('Employee created successfully:', response);
          // Thực hiện các hành động khác nếu cần
          // Đóng dialog
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error creating employee:', error);
          // In ra lỗi chi tiết từ API
          console.log('Error details:', error.error);
          // Xử lý lỗi nếu cần
        }
      );
    } else {
      // Hiển thị thông báo hoặc xử lý khác nếu form không hợp lệ
      console.warn('Form is not valid');
    }
  }
  


  onClose(): void {
    // Đóng modal khi bấm Cancel
    this.dialogRef.close();
  }
}
