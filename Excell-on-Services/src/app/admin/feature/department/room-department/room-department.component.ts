// room-department.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-department',
  templateUrl: './room-department.component.html',
  styleUrls: ['./room-department.component.css']
})
export class RoomDepartmentComponent implements OnInit {
  departmentName : any;
  departmentId: any;
  departmentInfo: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Lấy thông tin từ tham số động
    this.route.params.subscribe(params => {
      this.departmentId = params['departmentId'];
      this.departmentName = params['departmentName'];
      // Gọi hàm để load thông tin của phòng
      this.loadDepartmentInfo();
    });
  }

  editDepartment(){
    
  }
  // Hàm để load thông tin của phòng (thay thế bằng logic thực tế)
  loadDepartmentInfo() {
    
    this.departmentInfo = {
      departmentName: 'HR Department',
      employees: [
        { id: 1, name: 'John Doe', position: 'HR Manager' },
        { id: 2, name: 'Jane Smith', position: 'HR Specialist' },
        { id: 3, name: 'Minh', position: 'HR Manager' },
        { id: 4, name: 'Thuy', position: 'HR Dev' },
        { id: 5, name: 'Trong', position: 'HR Dev' },
        { id: 6, name: 'Toan', position: 'HR Dev' }
      ]
    };
  }
}
