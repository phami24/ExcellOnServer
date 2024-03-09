import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment-services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  clients: any[] = [];
  orders : any[] = [];
  carts: any[] = [];
  selectedClientId: string | null = null;
  selectedClient: any | null = null;
  selectedOrder: any | null = null;
  searchTerm: string = '';
  searchResults: any[] = [];
  filteredClient: any[] = [];
  showNoResultsMessage: boolean = false;
  showSearchResults: boolean = false;
  error: string | undefined;
  totalPrice: number | undefined;
  clientCart: any[] = [];
  cartDetails: any[] = [];
  clientId : any;
  filteredPayment: any[] = [];
  


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


  calculateTotalPrice() {
    if (this.orders && this.orders.length > 0) {
      this.totalPrice = this.orders.reduce((total, order) => total + order.price, 0);
    } else {
      this.totalPrice = 0;
    }
  }

  searchByName() {
    if (this.searchTerm) {
      this.paymentService.searchClientsByName(this.searchTerm).subscribe(clients => {
        this.clients = clients; // Gán kết quả tìm kiếm vào mảng clients
      }, error => {
        console.log('Error:', error);
      });
    }
  }
  

}
