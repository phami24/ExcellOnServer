// employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'https://localhost:7260/api/Auth/EmployeeRegister'; // Thay đổi thành địa chỉ API thực tế của bạn

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  createEmployee(newEmployeeData: any): Observable<any> {
    const headers = this.addTokenToHeader();
    const url = `${this.baseUrl}`;
    
    const formData = new FormData();
    formData.append('FirstName', newEmployeeData.firstName);
    formData.append('LastName', newEmployeeData.lastName);
    formData.append('Dob', newEmployeeData.dob);
    formData.append('Email', newEmployeeData.email);
    formData.append('Phone', newEmployeeData.phone);
    formData.append('Department', newEmployeeData.department);
    formData.append('Avatar', newEmployeeData.avatar);
    formData.append('Password', newEmployeeData.password);
    // Thêm các trường khác nếu cần

    return this.http.post(url, formData, { headers });
  }

  private addTokenToHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    });
  }
  
}
