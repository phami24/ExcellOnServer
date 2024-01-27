import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './state/employee.service';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  dropdownShowStates: { show: boolean }[] = [];
  isDropdownVisible: boolean[] = [];
  searchTerm: string = '';
  searchResults: any[] = [];
  filteredEmployees: any[] = [];
  isModalVisible = false;
  showForm = false;
  selectedEmployee: any;
  isCreating: boolean = true;
  sortedField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  showNoResultsMessage: boolean = false;
  showSearchResults: boolean = false;

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== 'light' && color !== 'dark' ? 'light' : color;
  }
  private _color = 'light';

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }
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



  search(): void {
    this.employeeService.searchEmployeesByName(this.searchTerm).subscribe(
      results => {
        console.log('Search results:', results);
        console.log('Search term:', this.searchTerm);
  
        // Kiểm tra nếu searchTerm không null hoặc rỗng
        if (!this.searchTerm || this.searchTerm.trim() === '') {
          // Thực hiện tìm kiếm tương tự như phía backend
          const searchTermLower = this.searchTerm.toLowerCase();
          this.searchResults = results.filter((employee: any) => {
            const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
            return fullName.includes(searchTermLower);
          });
  
          console.log('Filtered Employees:', this.searchResults);
  
          this.filteredEmployees = [...this.searchResults];
        } else {
          // Nếu searchTerm là null hoặc rỗng, hiển thị tất cả nhân viên
          this.filteredEmployees = [...results];
        }
  
        console.log('After copying:', this.filteredEmployees);
  
        // Hiển thị "0 result" nếu không có kết quả
        this.showNoResultsMessage = this.searchResults.length === 0;
  
        // Đặt giá trị cho showSearchResults
        this.showSearchResults = this.searchResults.length > 0;
      },
      error => {
        console.error('Search error:', error);
        // Đặt giá trị cho showSearchResults khi có lỗi (nếu cần)
        this.showSearchResults = false;
      },
      () => console.log('Search completed') // Log completion of observable
    );
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
      console.log('Confirmed to delete');
      // Gọi service hoặc API để xóa nhân viên
      this.employeeService.deleteEmployee(employee.id).subscribe(
        () => {
          console.log('Delete successful!');
          // Tiếp tục với các bước sau khi xóa
          this.toastr.success('Delete successful!', 'Success');
          this.loadEmployees();
        },
        (error) => {
          console.error('Delete failed:', error);
          // Xử lý lỗi nếu cần thiết
          this.toastr.error('Delete failed!', 'Error');
        }
      );
    } else {
       this.toastr.warning('Delete cancel!', 'Warning');
      // Xử lý khi hủy bỏ xóa (nếu cần)
    }
  }
  
  

  private loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = this.searchTerm ? this.searchResults : this.employees;
    });
  }



  sortData(field: string): void {
    if (field === this.sortedField) {
      // Đảo ngược hướng sắp xếp nếu trường đã được chọn
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Sắp xếp theo trường mới và đặt mặc định là sắp xếp tăng dần
      this.sortedField = field;
      this.sortOrder = 'asc';
    }

    // Thực hiện sắp xếp dữ liệu
    this.filteredEmployees.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (this.sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }

}
