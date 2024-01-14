import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAdmin from '../../State/admin/admin.actions';
import { IAdminState } from 'src/app/State/admin';
import { Observable, catchError, map } from 'rxjs';

const baseUrl = 'https://localhost:7180/api';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private store: Store<IAdminState>) {
    // Check for authentication status on initialization
    this.checkAuthenticationStatus();
  }

  private checkAuthenticationStatus() {
    const token = localStorage.getItem('token');

    if (token) {
      // Dispatch an action to set the authentication status
      this.store.dispatch(new fromAdmin.LoginSuccess({ userName: '', token }));
    }
  }

 

  login(email: string, password: string): Observable<{ result: boolean; token: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.http.post<{ result: boolean; token: string }>(`${baseUrl}/Auth/Login`, body, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }


  // New method for logging out
  logout(): void {
    // Clear token from local storage
    localStorage.removeItem('token');

    // Optionally, dispatch a LOGOUT action to notify the state about the logout
    this.store.dispatch(new fromAdmin.Logout());
  }
}
