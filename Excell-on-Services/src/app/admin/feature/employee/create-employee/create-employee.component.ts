import { Component, EventEmitter, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{
  employee: any = {}; // Add this line
  @Input() data: any;
  empForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<CreateEmployeeComponent>, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
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
