// employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7260/api/Employee';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    const token = localStorage.getItem('token');

    // Tạo header với Bearer token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.apiUrl}`, { headers });
  }

  updateEmployee(employeeId: number, updatedEmployee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Update/${employeeId}`, updatedEmployee);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Delete?id=${employeeId}`);
  }
  getEmployeesByDepartmentId(departmentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${departmentId}`);
  }

}
