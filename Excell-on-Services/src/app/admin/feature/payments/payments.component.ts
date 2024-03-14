import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment-services/payment.service';
import { Router } from '@angular/router';
import { UserClient } from './model/UserClient.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  clients: any[] = [];
  orders: any[] = [];
  selectedClientId: string | null = null;
  selectedClient: any | null = null;
  selectedOrder: any | null = null;
  searchTerm: string = '';
  showNoResultsMessage: boolean = false;
  showSearchResults: boolean = false;
  error: string | undefined;
  sortBy: 'name' | 'date' = 'name';
  currentPage = 1;
  itemsPerPage = 7;

  totalOrderAmount: number = 0;

  constructor(
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadClient();
    this.getOrders();

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

  getOrders() {
    this.paymentService.getOrders().subscribe(
      (orders) => {
        this.orders = orders;
        console.table(orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  showPayment(clientId: string) {
    this.selectedClientId = clientId;
    this.selectedClient = this.clients.find(client => client.clientId === clientId);
    this.selectedOrder = this.orders.find(order => order.clientId === clientId);
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

  sortById() {
    this.orders.sort((a, b) => a.orderId - b.orderId);
  }

  sortOrdersByDate() {
    this.orders.sort((a, b) => {
      const dateA = new Date(a.orderDate).getTime();
      const dateB = new Date(b.orderDate).getTime();
      return dateA - dateB;
    });
  }

  handleSort() {
    if (this.sortBy === 'name') {
      this.sortById();
    } else if (this.sortBy === 'date') {
      this.sortOrdersByDate();
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
    console.table(this.orders);
  }
  

  
  
}
