// employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7260/api/Employee';
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  private addTokenToHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getEmployees(): Observable<any[]> {
    const headers = this.addTokenToHeader();
    return this.http.get<any[]>(`${this.apiUrl}`, { headers });
  }

  updateEmployee(updatedEmployee: any): Observable<any> {
    const url = `${this.apiUrl}/Update`;
  
    // Tạo headers với Authorization và Content-Type là multipart/form-data
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  
    // Tạo FormData để chứa dữ liệu và append từng trường vào đó
    const formData = new FormData();
    for (const key in updatedEmployee) {
      if (updatedEmployee.hasOwnProperty(key)) {
        formData.append(key, updatedEmployee[key]);
      }
    }
  
    // Gửi yêu cầu PUT với FormData và headers
    return this.http.put(url, formData, { headers });
  }
  

  deleteEmployee(employeeId: number): Observable<any> {
    const headers = this.addTokenToHeader();
    return this.http.delete<any>(`${this.apiUrl}/Delete?id=${employeeId}`, { headers });
  }
  getEmployeesByDepartmentId(departmentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${departmentId}`);
  }

  searchEmployeesByName(name: string): Observable<any> {
    const headers = this.addTokenToHeader();
    const url = `${this.apiUrl}/search?name=${name}`;
    return this.http.get(url, { headers });
  }

}
