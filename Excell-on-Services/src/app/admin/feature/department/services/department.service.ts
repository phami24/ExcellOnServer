// department.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  saveDepartment(formData: any) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'https://localhost:7260/api'; // Thay đổi URL ở đây

  constructor(private http: HttpClient) { }

  // Lấy danh sách tất cả các phòng ban
  getDepartments(): Observable<any[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ' ${token}`,
    });
    return this.http.get<any[]>(`${this.apiUrl}/Department`, { headers }); // Thêm '/Department' ở đây nếu cần
  }

  // Lấy thông tin một phòng ban theo ID
  getDepartmentById(id: number): Observable<any> {
    const url = `${this.apiUrl}/Department/${id}`;

    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error in getDepartmentById:', error);
        // Nếu muốn truyền lỗi về thành phần gọi hàm, bạn có thể sử dụng throwError
        // return throwError('Có lỗi xảy ra khi tải thông tin phòng ban.');

        // Hoặc chỉ cần throw error để hiển thị trong console.log
        throw error;
      })
    );
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(
      `https://localhost:7260/api/Employee/${employeeId}`
    );
  }

  // Thêm một phòng ban mới
  addDepartment(DepartmentData: any): Observable<any> {
    console.log('Employee Data:', DepartmentData); // In ra dữ liệu để kiểm tra

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ' ${token}`,
    });

    const formData = new FormData();

    formData.append('departmentName', DepartmentData.departmentName);
    formData.append('departmentDescription', DepartmentData.departmentDescription);

    return this.http.post<any>(`${this.apiUrl}/Department`,formData, {headers});
  }

  //Gọi API để lấy danh sách nhân viên trong phòng ban
  getEmployeesByDepartmentId(departmentId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/Employee/getByDepartmentId/${departmentId}`
    );
  }

  // Cập nhật thông tin một phòng ban
  updateDepartment(id: number, department: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Department/${id}`, department);
  }

  // Xóa một phòng ban
  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Department/Delete?id=${id}`);
  }

  // Bổ sung các phương thức khác liên quan đến Department nếu cần
}
