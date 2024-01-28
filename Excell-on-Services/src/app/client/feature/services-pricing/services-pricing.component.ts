import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ServicesPageService } from '../../services/services-page/services-page.service';
import { Service } from 'src/app/interfaces/service';

@Component({
  selector: 'app-services-pricing',
  templateUrl: './services-pricing.component.html',
  styleUrls: ['./services-pricing.component.css'],
})
export class ServicesPricingComponent implements OnInit  {
  services?: Service[];
  openTab: number = 1;
  constructor(
    private servicesService: ServicesPageService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    initFlowbite();
    this.getService();
  }
  openServiceDetailForm(service: any): void {
    const dialogRef = this.dialog.open(ServiceDetailComponent, {
      width: '850px',
      data: service
    });

    dialogRef.afterClosed().subscribe((result) => {

      this.getService();
    });
  }
 
  getService(): void {
    this.servicesService.getService().subscribe({
      next: (data) => {
        this.services = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  imageService = [
    { imageSrc: '../../../assets/images/InBound.gif', altText: 'In-Bound' },
    { imageSrc: '../../../assets/images/teleSale.gif', altText: 'Out-Bound' },
    { imageSrc: '../../../assets/images/OutBound.gif', altText: 'Tele Sale' },   
  ];
}
