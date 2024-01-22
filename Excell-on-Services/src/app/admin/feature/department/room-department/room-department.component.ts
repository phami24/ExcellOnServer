// room-department.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-department',
  templateUrl: './room-department.component.html',
  styleUrls: ['./room-department.component.css']
})
export class RoomDepartmentComponent implements OnInit {
  departmentId: any;
  departmentInfo: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Lấy thông tin từ tham số động
    this.route.params.subscribe(params => {
      this.departmentId = params['departmentId'];
      // Gọi hàm để load thông tin của phòng
      this.loadDepartmentInfo();
    });
  }

  // Hàm để load thông tin của phòng (thay thế bằng logic thực tế)
  loadDepartmentInfo() {
    
    this.departmentInfo = {
      departmentName: 'HR Department',
      employees: [
        { id: 1, name: 'John Doe', position: 'HR Manager' },
        { id: 2, name: 'Jane Smith', position: 'HR Specialist' }
      ]
    };
  }
}
