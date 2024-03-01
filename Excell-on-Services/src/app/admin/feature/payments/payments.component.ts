import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment-services/payment.service';
import { Router } from '@angular/router';
import { UserClinet } from './model/UserClient.model'; 

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  clients: UserClinet[] = [];
  selectedClientId: string | null = null;
  selectedClient: any | null = null;
  searchTerm: string = '';
  searchResults: any[] = [];
  filteredClient: any[] = [];
  showNoResultsMessage: boolean = false;
  showSearchResults: boolean = false;
  
  constructor(
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.loadClient();
  }

  loadClient(): void {
    this.paymentService.getClient().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  showPayment(clientId: string) {
 
    this.selectedClientId = clientId;
    this.selectedClient = this.clients.find(client => client.clientId === clientId);

    console.log(this.selectedClient);
    console.log(this.selectedClientId);
  }

  

  search(): void {
    this.paymentService.searchClientByName(this.searchTerm).subscribe(
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
  
          this.filteredClient = [...this.searchResults];
        } else {
          // Nếu searchTerm là null hoặc rỗng, hiển thị tất cả nhân viên
          this.filteredClient = [...results];
        }
  
        console.log('After copying:', this.filteredClient);
  
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
  

  createPayment() {
    const paymentIntentDto = { amount: 1000, currency: 'usd' };
    this.paymentService.createPaymentIntent(paymentIntentDto).subscribe(
      (response) => {
        console.log('Payment intent created successfully:', response);
        // Do something with the response
      },
      (error) => {
        console.error('Error creating payment intent:', error);
        // Handle error
      }
    );
  }

  confirmPayment() {
    const confirmPaymentDto = { tokenId: 'your-token-id', clientSecret: 'your-client-secret' };
    this.paymentService.confirmPayment(confirmPaymentDto).subscribe(
      (response) => {
        console.log('Payment confirmed successfully:', response);
        // Do something with the response
      },
      (error) => {
        console.error('Error confirming payment:', error);
        // Handle error
      }
    );
  }

 

}
