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
      dob: [null, Validators.required],
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
    if (this.empForm.valid) {
      const newEmployeeData = this.empForm.value;
  
      // Gọi phương thức dịch vụ để tạo nhân viên
      this.employeeService.createEmployee(newEmployeeData).subscribe(
        createdEmployee => {
          console.log('Nhân viên đã được tạo:', createdEmployee);
          // Bạn có thể thực hiện xử lý bổ sung, chẳng hạn như đóng hộp thoại
          this.dialogRef.close(true);
        },
        error => {
          console.error('Lỗi tạo nhân viên:', error);
          // Xử lý lỗi theo cách cần thiết
          console.log(error.errors);
          console.error('Server error details:', error.error);

        }
      );
      
    }
    
  }

  


  onClose(): void {
    // Đóng modal khi bấm Cancel
    this.dialogRef.close();
  }
}
