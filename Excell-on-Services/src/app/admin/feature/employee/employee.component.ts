import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import createPopper from 'popper.js';
import { EmployeeService } from './state/employee.service';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  employees: any[] = [];
  dropdownShowStates: { show: boolean }[] = []; 
  isDropdownVisible: boolean[] = [];
  searchTerm: string = '';
  filteredEmployees: any[] = [];
  isModalVisible = false;
  showForm = false;
  selectedEmployee: any;
  isCreating: boolean = true;
  
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== 'light' && color !== 'dark' ? 'light' : color;
  }
  private _color = 'light';

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.showForm = false; 
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.dropdownShowStates = this.employees.map((_, index) => ({ index, show: false }));
      this.filteredEmployees = this.employees; 
    });
  }
  //table-dropdown

  dropdownPopoverShow = false;
  
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef!: ElementRef;
  ngAfterViewInit(): void {
    new createPopper(this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: 'bottom-start',
      });
  }

  initPopper(): void {
    // Gọi createPopper ở đây
    new createPopper(this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: 'bottom-start',
      });
  }

  onSearchInputChange(event: any): void {
    const value = event?.target?.value || '';
    console.log('Search Term:', value);
  
    this.searchTerm = value;
  
    // Thực hiện logic tìm kiếm nếu cần
    this.filteredEmployees = this.employees.filter(employee => {
      const firstName = (employee.firstName || '').toLowerCase();
      const lastName = (employee.lastName || '').toLowerCase();
      const email = (employee.email || '').toLowerCase();
      const department = (employee.department || '').toLowerCase();
      const searchTermLower = this.searchTerm.toLowerCase();
  
      return (
        firstName.includes(searchTermLower) ||
        lastName.includes(searchTermLower) ||
        email.includes(searchTermLower) ||
        department.includes(searchTermLower)
      );
    });
  
    console.log('Filtered Employees:', this.filteredEmployees);
  }
  
  createEmployee() {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Thực hiện các hành động sau khi đóng modal (nếu cần)
    });
  }
  

  openEditForm(employee: any): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '550px',
      data: employee
    });

    dialogRef.afterClosed().subscribe((result) => {

      this.loadEmployees();
    });
  }

  deleteEmployee(employee: any): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      // Gọi service hoặc API để xóa nhân viên
      this.employeeService.deleteEmployee(employee.employeeId).subscribe(() => {
        // Sau khi xóa, làm điều gì đó nếu cần
        // Ví dụ: Reload danh sách nhân viên
        this.loadEmployees();
      });
    }
  }

  private loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = this.employees;
    });
  }


  toggleDropdown(event: MouseEvent, index: number): void {
    event.preventDefault();

    // Ẩn tất cả dropdown trước khi hiển thị dropdown cho dòng được chọn
    this.isDropdownVisible = this.isDropdownVisible.map(() => false);
    // Hiển thị dropdown cho dòng được chọn
    this.isDropdownVisible[index] = true;

    // Khởi tạo popper khi dropdown được hiển thị
    if (this.isDropdownVisible[index]) {
      this.initPopper();
    }
  }
}
