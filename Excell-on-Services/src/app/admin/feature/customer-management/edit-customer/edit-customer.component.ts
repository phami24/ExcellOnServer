import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/admin/services/customer/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  updateForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCustomerComponent>,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      clientId: [this.data?.clientId],
      firstName: [this.data?.firstName || '', Validators.required],
      lastName: [this.data?.lastName || '', Validators.required],
      dob: [this.data?.dob || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      phone: [this.data?.phone || '', [Validators.required]],
    });
  }

  onFormSubmit() {
    if (this.updateForm.valid) {
      if (this.data) {
        this.customerService
          .updateCustomer(this.data.clientId, this.updateForm.value)
          .subscribe({
            next: (val: any) => {
              
              this.toastr.success('Update successful!', 'Success');
              this.dialogRef.close(true);
             
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      }
    }
  }
}
