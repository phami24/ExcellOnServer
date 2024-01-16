import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ClientService } from 'src/app/auth/services/client.service';
import * as fromClient from '../../State/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private store: Store,
    private router: Router,
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, this.nameValidator]],
      lastName: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
    });
  }

  // Custom validator for first name and last name
  nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const namePattern = /^[a-zA-Z ]*$/;
    if (!namePattern.test(control.value)) {
      return { 'invalidName': true };
    }
    return null;
  }

  // Custom validator for email
  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(control.value)) {
      return { 'invalidEmail': true };
    }
    return null;
  }

  // Custom validator for password
  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(control.value)) {
      return { 'invalidPassword': true };
    }
    return null;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      // Dispatch the Register action to trigger the NgRx effect
      this.store.dispatch(new fromClient.Register(formData));

      this.router.navigate(['/auth/login']);
    }
  }
}
