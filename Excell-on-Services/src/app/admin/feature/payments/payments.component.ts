import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment-services/payment.service';
import { Router } from '@angular/router';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Order } from './model/order';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  clients: any[] = [];
  orders: any[] = [];
  serviceCharges: any[] = [];

  selectedClientId: number | null = null;
  selectedClient: any | null = null;
  selectedOrder: any | null = null;
  searchTerm: string = '';
  showNoResultsMessage: boolean = false;
  showSearchResults: boolean = false;
  error: string | undefined;
  sortBy: 'name' | 'date' | 'status' | 'total' = 'name';
  currentPage = 1;
  itemsPerPage = 7;

  totalOrderAmount: number = 0;

  constructor(
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadClient();
    this.calculateTotalOrderAmount();
  }

  loadClient(): void {
    this.paymentService.getClient().subscribe(
      (clients) => {
        this.clients = clients;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  
  getServiceChargesByServiceId(): void {
    this.paymentService.getServiceChargesByServiceId().subscribe(
      (serviceCharges) => {
        this.serviceCharges = serviceCharges;
        console.log(serviceCharges);
      },
      (error) => {
        console.error('Error fetching service charges by service ID:', error);
      }
    );
  }

  addServiceChargesNameToOrders(): void {
    this.orders.forEach(order => {
      this.paymentService.getServiceChargesByServiceId().subscribe(
        (serviceCharges) => {
          order.serviceChargesName = serviceCharges?.serviceChargesName; 
          console.error(order.serviceChargesName);
        },
        (error) => {
          console.error('Error fetching service charges:', error);
        }
      );
    });
  }
  
  getOrderByClientId(clientId: number) {
    this.paymentService.getOrderByClientId(clientId).pipe(
      mergeMap((orders: Order[]) => {
        const observables = orders.map(order => this.paymentService.getServiceChargesByServiceId().pipe(
          map(serviceCharges => ({ ...order, serviceChargesName: serviceCharges[0]?.serviceName })) 
        ));
        return forkJoin(observables);
      })
    ).subscribe(
      ordersWithServiceChargesName => {
        this.orders = ordersWithServiceChargesName;
        this.calculateTotalOrderAmount();
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  
  
  showPayment(clientId: number) {
    this.selectedClientId = clientId;
    this.selectedClient = this.clients.find(client => client.clientId === clientId);
    this.selectedOrder = this.orders.find(order => order.clientId === clientId);
    this.getOrderByClientId(clientId);
   
      this.getServiceChargesByServiceId();
    
  }

  searchByName() {
    if (this.searchTerm.trim() !== '') {
      this.paymentService.searchClientByName(this.searchTerm).subscribe(
        (clients) => {
          this.clients = clients;
          this.showSearchResults = true;
          this.showNoResultsMessage = clients.length === 0;
        },
        (error) => {
          console.error('Error searching clients:', error);
          this.error = 'Error occurred while searching clients.';
        }
      );
    } else {
      this.showSearchResults = false;
      this.showNoResultsMessage = false;
      this.loadClient();
    }
  }

  paginate(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.orders.length);
    return this.orders.slice(startIndex, endIndex);
  }

  totalPage(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }

  getPagesArray(): number[] {
    return Array(this.totalPage()).fill(0).map((x, i) => i + 1);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  calculateTotalOrderAmount() {
    if (this.orders && this.orders.length > 0) {
      this.totalOrderAmount = this.orders.reduce((total, order) => total + order.orderTotal, 0);
    } else {
      this.totalOrderAmount = 0; 
    }
  }
  
  getStatusText(status: number): string {
    return status === 1 ? 'Success' : 'Processing';
  }

  sortOrders(): void {
    switch (this.sortBy) {
      case 'name':
        this.orders.sort((a, b) => (a.clientName > b.clientName ? 1 : -1));
        break;
      case 'date':
        this.orders.sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime());
        break;
      case 'status':
        this.orders.sort((a, b) => a.orderStatus - b.orderStatus);
        break;
      case 'total':
        this.orders.sort((a, b) => a.orderTotal - b.orderTotal);
        break;
      default:
        break;
    }
  }
}
