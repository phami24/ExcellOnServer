
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DepartmentDetailsComponent } from '../department-details/department-details.component';
import { Employee } from '../model/employee.model';
@Component({
  selector: 'app-room-department',
  templateUrl: './room-department.component.html',
  styleUrls: ['./room-department.component.css'],
})
export class RoomDepartmentComponent implements OnInit {
  departmentName: any;
  departmentId: any;
  departmentInfo: any = {};
  
  selectedEmployee: Employee | null = null;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit() {
    // Lấy thông tin từ tham số động
    this.route.params.subscribe((params) => {
      this.departmentId = params['departmentId'];
      this.departmentName = params['departmentName'];
      // Gọi hàm để load thông tin của phòng
      this.loadDepartmentInfo();
    });
  }

  showDepartmentDetail(employeeId: number): void {
    const dialogRef = this.dialog.open(DepartmentDetailsComponent, {
      width: '700px',
      data: { employeeId: employeeId, departmentInfo: this.departmentInfo },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  closeDepartmentDetail(): void {
    this.selectedEmployee = null;
  }

  editDepartment() {

  }

  loadDepartmentInfo() {
    // FIRST NAME	LAST NAME	DOB	EMAIL	PHONE
    this.departmentInfo = {
      departmentName: 'HR Department',
      employees: [
        {
          id: 1,
          firstname: 'Trong',
          lastname: 'Dv',
          dob: 18,
          email: 'email@example.com',
          phone: '0123456789',
          address: 'Thai Binh',
          position: 'Developer'
        },
        {
          id: 1,
          firstname: 'Toan',
          lastname: 'DV',
          dob: 18,
          email: 'email@example.com',
          phone: '0123456789',
          address: 'Thai Binh',
          position: 'Developer'

        },

        {
          id: 1,
          firstname: 'Minh',
          lastname: 'Binh',
          dob: 18,
          email: 'email@example.com',
          phone: '0123456789',
          address: 'Thai Binh',
          position: 'Leader'


        },

        {
          id: 1,
          firstname: 'Thuy',
          lastname: 'Thanh',
          dob: 18,
          email: 'email@example.com',
          phone: '0123456789',
          address: 'Thai Binh',
          position: 'Tester'

        },

        {
          id: 1,
          firstname: 'Hung',
          lastname: 'Nguyen',
          dob: 40,
          email: 'email@example.com',
          phone: '0123456789',
          address: 'Thai Binh',
          position: 'Manager'
        },
      ],
    };
  }
}
