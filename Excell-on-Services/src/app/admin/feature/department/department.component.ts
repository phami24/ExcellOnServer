import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from './services/department.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { UpdateDepartmentDto } from './edit-department/update-department.dto';

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
    private router: Router,
    private toastr: ToastrService
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

  editDepartment(department: any) {
    const dialogRef = this.dialog.open(EditDepartmentComponent, {
      width: '325px',
      data: { department },
    });

    dialogRef.afterClosed().subscribe((result: UpdateDepartmentDto) => {
      if (result) {
        const updateDto: UpdateDepartmentDto = result;

        this.departmentService.updateDepartment(updateDto).subscribe(
          () => {
            this.toastr.success('Update successful!', 'Success');
            this.loadDepartments();
          },
          (error) => {
            console.error('Error updating department:', error);
            this.toastr.error('Update failed!', 'Error');
          }
        );
      }
    });
  }


 

  deleteDepartment(department: any): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.departmentService
        .deleteDepartment(department.id)
        .subscribe(() => {
          this.toastr.success('Delete successful!', 'Success');
          this.loadDepartments();
        });
    }
  }

  createDepartment() {
    const dialogRef = this.dialog.open(CreateDepartmentComponent, {
      width: '325px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const departmentData = result;
        this.departmentService.addDepartment(departmentData).subscribe(
          response => {
            this.loadDepartments();
          },
          error => {
            console.error('Error adding department:', error);
          }
        );
      }
    });
  }

  resetForm() {
    this.currentDepartment = {};
  }
  // navigateToRoomDepartment(departmentId: number): void {
  //   this.router.navigate(['departments', departmentId, 'room']);
  // }
  // getRandomColor() {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }
  // getRandomBackground(index: number): string {
  //   const colors = ['#CCFFFF', '#99FFFF', '#66FFFF', '#33FFFF', '#00FFFF', '#00ffff'];
  //   const colorIndex = Math.floor(index / (this.departments.length / 3)) % colors.length;
  //   return colors[colorIndex];
  // }

  

  viewRoomDepartment(id: any) {
    this.router.navigate(['department/room-department', id]);
  }
}
