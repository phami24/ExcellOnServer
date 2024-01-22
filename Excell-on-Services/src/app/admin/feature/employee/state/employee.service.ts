// employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7180/api/Employee';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  updateEmployee(employeeId: number, updatedEmployee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Update/${employeeId}`, updatedEmployee);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Delete?id=${employeeId}`);
  }
}
