import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './create-employee.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService  } from '../../../shared/notification/notification.service';



@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  // employee: any = {}; // Add this line
  // @Input() data: any;
  @ViewChild('loadingSpinner') loadingSpinner: ElementRef | undefined;
  employees: any[] = [];
  empForm!: FormGroup;
  formErrors: any = {};
  updating: boolean = false;
  showPassword = false;
  constructor(public dialogRef: MatDialogRef<CreateEmployeeComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private notificationService: NotificationService,
    ) { }

  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', [Validators.required, this.ageValidator]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
      departmentId: ['', Validators.required],
      password: ['', [Validators.required, this.passwordRequirementsValidator]],
      avatar: ['', Validators.required], // Thêm trường avatar vào FormGroup
    });
    this.empForm.valueChanges.subscribe(() => {
      // Kiểm tra lỗi và cập nhật formErrors ngay khi có sự thay đổi
      this.formErrors = this.getFormValidationErrors();
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  getFormValidationErrors(): any[] {
    const errors: any[] = [];

    Object.keys(this.empForm.controls).forEach((key: string) => {
      const controlErrors = this.empForm.get(key)?.errors;
      if (controlErrors != null) {
        errors.push({
          field: key,
          messages: Object.keys(controlErrors).map((keyError: string) => {
            if (keyError === 'underage') {
              return `Age must be at least 18 years old!`;
            } else if (keyError === 'email') {
              return `Email must be a valid email address.`; // Thêm thông báo lỗi cho email không đúng định dạng
            } else if (keyError === 'invalidPhone') {
              return `Phone must have exactly 10 numbers.`; 
            } else if (keyError === 'passwordRequirementsValidator') {
              return `Password must contain at least one uppercase letter, one digit and one special character.`;
            }
            // Thêm các trường hợp lỗi khác nếu cần
            return ''; // Trường hợp mặc định, có thể là chuỗi trống hoặc một thông báo khác
        }),
        
        });
      }
    });

    console.log(errors); // Kiểm tra lỗi ở đây
    return errors;
  }

  phoneValidator(control: any): { [key: string]: boolean } | null {
    const phoneNumber = control.value;
  
    // Kiểm tra số điện thoại có đúng 10 kí tự không
    if (phoneNumber && phoneNumber.length === 10) {
      return null; // Số điện thoại hợp lệ
    } else {
      return { 'invalidPhone': true }; // Số điện thoại không hợp lệ
    }
  }

  ageValidator(control: any): { [key: string]: boolean } | null {
    const birthDate = new Date(control.value);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000);

    if (ageInYears < 18) {
      return { 'underage': true };
    }

    return null; // Thêm dòng này để đảm bảo rằng luôn có giá trị được trả về
  }

  passwordRequirementsValidator(control: any): { [key: string]: boolean } | null {
    const password = control.value;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  
    // Kiểm tra xem mật khẩu có đáp ứng tất cả các yêu cầu không
    if (!(uppercaseRegex.test(password) && digitRegex.test(password) && specialCharRegex.test(password))) {
      return { 'passwordRequirementsValidator': true };
    }
  
    return null;
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
      this.updating = true;
      const newEmployee = this.empForm.value;

      // Gọi phương thức createEmployee từ service
      this.employeeService.createEmployee(newEmployee).subscribe(
        (response) => {
          this.toastr.success('Create successful!', 'Success');
          this.dialogRef.close(); // Đóng dialog khi tạo mới thành công
          this.loadEmployees();
          this.notificationService.notifyCreateEmployee(newEmployee.firstName);
        },
        (error) => {
          console.error('Error creating employee', error);
          this.toastr.error('Create fail!', 'Error');
          // Xử lý lỗi, hiển thị thông báo, v.v.
        }
      ).add(() => {
        // Kết thúc quá trình cập nhật (thành công hoặc thất bại)
        this.updating = false; // Dừng hiển thị loading
      });
    } else {
      this.toastr.error('Create fail!', 'Error');
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
    this.toastr.warning('Create cancel!', 'Cancel');
    this.dialogRef.close();
  }
}
