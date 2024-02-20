import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ServicesPageService } from '../../services/services-page/services-page.service';
import { Service } from 'src/app/interfaces/service';
import { ServiceCharge } from 'src/app/interfaces/serviceCharge';
import { Router } from '@angular/router';
@Component({
  selector: 'app-services-pricing',
  templateUrl: './services-pricing.component.html',
  styleUrls: ['./services-pricing.component.css'],
})
export class ServicesPricingComponent implements OnInit {
  services?: Service[];
  serviceCharges: { [serviceId: number]: ServiceCharge[] } = {};
  openTab: number = 1;
  constructor(
    private servicesService: ServicesPageService,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    initFlowbite();
    this.getService();
  }
  openServiceDetailForm(service: any): void {
    const dialogRef = this.dialog.open(ServiceDetailComponent, {
      width: '850px',
      data: service,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getService();
    });
  }
  addToCart(charge: any) {
    this.router.navigate(['/user/payment'], {
      queryParams: { chargeData: JSON.stringify(charge) },
    });
  }

  getService(): void {
    this.servicesService.getService().subscribe({
      next: (data) => {
        this.services = data;
        // Fetch service charges for each service
        for (const service of this.services ?? []) {
          this.getServiceCharges(service.serviceId);
        }
      },
      error: (e) => console.error(e),
    });
  }

  getServiceCharges(serviceId: number): void {
    // Check if service charges for this serviceId already exist
    if (!this.serviceCharges[serviceId]) {
      this.servicesService.getServiceChargeByServiceId(serviceId).subscribe({
        next: (data) => {
          // Store service charges in an object using serviceId as key
          this.serviceCharges[serviceId] = data;
          console.log(serviceId);
        },
        error: (e) => console.error(e),
      });
    }
  }

  imageService = [
    { imageSrc: '../../../assets/images/InBound.gif', altText: 'In-Bound' },
    { imageSrc: '../../../assets/images/teleSale.gif', altText: 'Out-Bound' },
    { imageSrc: '../../../assets/images/OutBound.gif', altText: 'Tele Sale' },
  ];
}
