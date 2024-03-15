import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentHistoryService } from '../../services/payment-history/payment-history.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  constructor(
    private paymentHistoryService: PaymentHistoryService,
    private toastr: ToastrService
  ) {}
 ngOnInit(): void {
  this.fetchOrderHistory();
 }
  async fetchOrderHistory(): Promise<void> {
    
      this.paymentHistoryService.getOrderHistory(11).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => console.error(e),
      });
    
  }
}
