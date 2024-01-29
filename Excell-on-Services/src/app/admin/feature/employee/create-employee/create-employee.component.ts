import { Component, EventEmitter, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './create-employee.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{
  // employee: any = {}; // Add this line
  // @Input() data: any;
  employees: any[] = [];
  empForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<CreateEmployeeComponent>,
     private formBuilder: FormBuilder,
     private toastr: ToastrService,
      private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      departmentId: ['', Validators.required],
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
   
    if (this.empForm.valid) {
      const newEmployee = this.empForm.value;
  
      // Gọi phương thức createEmployee từ service
      this.employeeService.createEmployee(newEmployee).subscribe(
        (response) => {
          this.toastr.success('Create successful!', 'Success');
          this.dialogRef.close(); // Đóng dialog khi tạo mới thành công
          this.loadEmployees();
        },
        (error) => {
          console.error('Error creating employee', error);
          this.toastr.error('Create fail!', 'Error');
          // Xử lý lỗi, hiển thị thông báo, v.v.
        }
      );
    }
    
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Lỗi khi tải danh sách nhân viên', error);
        // Xử lý lỗi, hiển thị thông báo, v.v.
      }
    );
  }

  


  onClose(): void {
    // Đóng modal khi bấm Cancel
    this.dialogRef.close();
  }
}
