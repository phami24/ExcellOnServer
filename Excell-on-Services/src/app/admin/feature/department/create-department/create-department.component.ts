import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent {
  department: any = {}; 
  @Input() data: any;
  depForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<CreateDepartmentComponent>, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.depForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Thêm các trường khác của form vào đây
    });
  }

  onSave(): void {
    // Xử lý lưu thông tin nhân viên
    this.dialogRef.close();
  }

  onClose(): void {
    // Đóng modal khi bấm Cancel
    this.dialogRef.close();
  }
}
