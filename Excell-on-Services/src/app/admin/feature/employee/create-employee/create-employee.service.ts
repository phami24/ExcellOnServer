// employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'https://localhost:7260/api/Auth/EmployeeRegister'; // Thay đổi thành địa chỉ API thực tế của bạn

  constructor(private http: HttpClient) {}

  createEmployee(employeeData: any): Observable<any> {
    console.log('Employee Data:', employeeData); // In ra dữ liệu để kiểm tra
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.baseUrl}`, employeeData, { headers });
  }
  
}
