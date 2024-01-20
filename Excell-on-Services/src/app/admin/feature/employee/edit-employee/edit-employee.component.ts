// edit-employee.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  
    this.empForm = this.formBuilder.group({
      firstName: [this.data?.firstName || '', Validators.required],
      lastName: [this.data?.lastName || '', Validators.required],
      age: [this.data?.age || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      // Thêm các trường khác của form vào đây
    });
  }

  onSave(): void {
    // Xử lý lưu thông tin nhân viên
    this.dialogRef.close();
  }
}
