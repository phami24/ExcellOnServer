// employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  
  private apiUrl = 'https://localhost:7180/api/Deparment';

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các phòng ban
  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Lấy thông tin một phòng ban theo ID
  getDepartmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Thêm một phòng ban mới
  addDepartment(department: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, department);
  }

  // Cập nhật thông tin một phòng ban
  updateDepartment(id: number, department: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, department);
  }

  // Xóa một phòng ban
  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  
}
