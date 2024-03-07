import {
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServiceChargeService } from '../../services/service-charge/service-charge.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ServiceCharge } from 'src/app/interfaces/serviceCharge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AddServiceChargeComponent } from './add-service-charge/add-service-charge/add-service-charge.component';
import { ConfirmDialogComponent } from 'src/app/Shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-service-charge',
  templateUrl: './service-charge.component.html',
  styleUrls: ['./service-charge.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
  ],
})
export class ServiceChargeComponent implements OnInit {
  displayedColumns: string[] = [
    'serviceChargesId',
    'serviceChargesName',
    'serviceChargesDescription',
    'price',
    'serviceId',
    'actions',
  ];
  dataSource: MatTableDataSource<ServiceCharge>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('addServiceContainer', { read: ViewContainerRef })
  addServiceContainer!: ViewContainerRef;

  constructor(
    private serviceManagementService: ServiceChargeService,
    public dialogRef: MatDialogRef<ServiceChargeComponent>,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.dataSource = new MatTableDataSource<ServiceCharge>();
  }

  ngOnInit(): void {
    this.getServiceList();
  }
  getServiceList() {
    this.serviceManagementService.getServiceById(this.data).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // openEditForm(service: any): void {
  //   const dialogRef = this.dialog.open(EditServiceComponent, {
  //     width: '700px',
  //     data: service,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.getServiceList();
  //   });
  // }
  openAddServiceComponent(): void {
    this.addServiceContainer.clear();
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        AddServiceChargeComponent
      );
    const componentRef =
      this.addServiceContainer.createComponent(componentFactory);
    componentRef.instance.data = this.data;
  }

  deleteService(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete this service?',
        yesText: 'Delete',
        noText: 'Cancel',
        isCritical : true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.serviceManagementService.deleteService(id).subscribe(() => {
          this.getServiceList();
          this.toastr.success('Delete successful!', 'Success');
        });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
