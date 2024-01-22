import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from './services/department.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  departments: any[] = [];
  currentDepartment: any = {};
  navbarOpen = false;

  constructor(
    public dialog: MatDialog,
    private departmentService: DepartmentService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadDepartments();
  }
  

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  editDepartment(id: number) {
    this.departmentService.getDepartmentById(id).subscribe((department) => {
      this.currentDepartment = department;
    });
  }

  saveDepartment() {
    if (this.currentDepartment.DepartmentId) {
      this.departmentService
        .updateDepartment(
          this.currentDepartment.DepartmentId,
          this.currentDepartment
        )
        .subscribe(() => {
          this.loadDepartments();
          this.resetForm();
        });
    } else {
      this.departmentService
        .addDepartment(this.currentDepartment)
        .subscribe(() => {
          this.loadDepartments();
          this.resetForm();
        });
    }
  }

  deleteDepartment(id: number) {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.loadDepartments();
      this.resetForm();
    });
  }

  resetForm() {
    this.currentDepartment = {};
  }
  navigateToRoomDepartment(departmentId: number): void {
    this.router.navigate(['departments', departmentId, 'room']);
  }
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  getRandomBackground(index: number): string {
    const colors = ['#CCFFFF', '#99FFFF', '#66FFFF', '#33FFFF', '#00FFFF', '#00ffff'];
    const colorIndex = Math.floor(index / (this.departments.length / 3)) % colors.length;
    return colors[colorIndex];
  }
  
  performAction(event: any): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    switch (selectedValue) {
      case 'move':
        // Perform the Move action
        console.log('Move action');
        break;
      case 'unenroll':
        // Perform the Unenroll action
        console.log('Unenroll action');
        break;
      default:
        // Do nothing for invalid action
        break;
    }
  }
  
  viewRoomDepartment(departmentId: any) {
    this.router.navigate(['department/room-department', departmentId]);
  }
  
}
