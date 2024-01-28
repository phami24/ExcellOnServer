// create-department.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css'],
})
export class CreateDepartmentComponent implements OnInit {
  depForm!: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateDepartmentComponent>, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    // Initialize the form with the necessary controls and validators
    this.depForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  // Helper function to check if a form control has an error
  hasError(controlName: string, errorName: string): boolean {
    return this.depForm.controls[controlName].hasError(errorName);
  }

  // Function to save the department
  saveDepartment(): void {
    if (this.depForm.valid) {
      // Perform save logic here
      console.log(this.depForm.value);
      const formData = this.depForm.value;
      console.log(formData);
      this.departmentService.addDepartment(formData).subscribe(
        (response) => {
          console.log('Department created successfully:', response);
          // Perform other actions if needed
          // Close dialog
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error creating department:', error);
          // Log error details
          console.log('Error details:', error.error);
          // Handle the error if needed
        }
      );
    } else {
      console.warn('Form is not valid');
    }
  }
  
  // Function to cancel the form and close the dialog
  cancel(): void {
    this.dialogRef.close();
  }
}
