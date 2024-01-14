import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, take, takeUntil } from 'rxjs';

import * as fromRoot from '../../State/index';
import * as fromAdmin from '../../State/admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  loading$: Observable<boolean> = new Observable(); 
  success$: Observable<boolean> = new Observable();
  error$: Observable<boolean> = new Observable();
  userEmail$: Observable<string> = new Observable();
  destroy$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.IAppState>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() {
    this.loading$ = this.store.select(fromAdmin.getLoadingLogin).pipe(takeUntil(this.destroy$));
    this.success$ = this.store.select(fromAdmin.getSuccessLogin).pipe(takeUntil(this.destroy$));
    this.error$ = this.store.select(fromAdmin.getFailLogin).pipe(takeUntil(this.destroy$));
    this.userEmail$ = this.store.select(fromAdmin.getUserEmail);

    this.onLoginSuccess();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(new fromAdmin.Login({ email, password }));
  }

  onLoginSuccess() {
    this.success$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.userEmail$.pipe(
        take(1)  
      ).subscribe(userEmail => {
        if (userEmail) {
          // Display or use userEmail as needed
          console.log('User Email:', userEmail);
        }
      });
      
      this.store.pipe(
        select(fromAdmin.getToken), 
        take(1)  
      ).subscribe(token => {
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/admin/main']);
        }
      });
    });
  }

  // New method for logging out
  logout() {
    this.store.dispatch(new fromAdmin.Logout());
    localStorage.removeItem('token'); 
    this.router.navigate(['/auth/adminLogin']); 
  }
}
