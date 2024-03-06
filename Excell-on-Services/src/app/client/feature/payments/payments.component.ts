import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { ServiceCharge } from 'src/app/interfaces/serviceCharge';
import { ProfileService } from '../../services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../services/order/order.service';
import { OrderDetail } from 'src/app/interfaces/orderDetail';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  serviceCharges: { [clientId: number]: ServiceCharge[] } = {};
  token: string | null = localStorage.getItem('token');
  userProfile: any;
  userId: number | undefined;
  totalPrice: number = 0;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private orderService: OrderService,
    private profileService: ProfileService,
    private toastr: ToastrService
  ) {}
  handler: any = null;
  ngOnInit() {
    this.loadStripe();
    this.getCartByUserId();
  }
  async getCartByUserId(): Promise<void> {
    if (this.token !== null) {
      this.profileService.GetProfileByJwt(this.token).subscribe(
        (response) => {
          this.userProfile = response.userProfile;
          // console.log(this.userProfile);
          // Check if userProfile is not null and has id property
          if (this.userProfile && this.userProfile.id) {
            this.userId = this.userProfile.id;
            // Check if userId is defined before calling getCart
            if (this.userId !== undefined) {
              this.getCart(this.userId);
            } else {
              console.error(
                'User ID is undefined. Handle this case appropriately.'
              );
            }
          } else {
            console.error(
              'User profile or user ID is missing. Handle this case appropriately.'
            );
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Token is null. Handle this case appropriately.');
    }
  }
  async getCart(clientId: number): Promise<void> {
    // Check if service charges for this clientId already exist
    if (!this.serviceCharges[clientId]) {
      this.cartService.getCartByClientId(clientId).subscribe({
        next: (data) => {
          // Store service charges in an object using clientId as key
          this.serviceCharges[clientId] = data;
          // console.log(clientId)
          this.totalPrice = this.calculateTotalPrice();
        },
        error: (e) => console.error(e),
      });
    }
  }
  calculateTotalPrice(): number {
    let total = 0;
    for (const clientId in this.serviceCharges) {
      if (this.serviceCharges.hasOwnProperty(clientId)) {
        const charges = this.serviceCharges[clientId];
        for (const charge of charges) {
          total += charge.price;
        }
      }
    }
    return total;
  }

  deleteCartItem(cartItemId: number, clientId: number): void {
    if (confirm('Are you sure you want to delete this?')) {
      this.cartService.deleteCartItemById(cartItemId, clientId).subscribe({
        next: () => {
          // Remove the deleted item from the serviceCharges object
          if (this.serviceCharges[clientId]) {
            this.serviceCharges[clientId] = this.serviceCharges[
              clientId
            ].filter((item) => item.cartId !== cartItemId);
            this.totalPrice = this.calculateTotalPrice();
          }
          this.toastr.success('Delete successful!', 'Success');
        },
        error: (error) => {
          console.error('Error deleting cart item:', error);
          this.toastr.error('Error deleting cart item', 'Error');
        },
      });
    }
  }
  deleteCart(): void {
    if (this.token !== null) {
      this.profileService.GetProfileByJwt(this.token).subscribe(
        (response) => {
          this.userProfile = response.userProfile;
          // console.log(this.userProfile);
          // Check if userProfile is not null and has id property
          if (this.userProfile && this.userProfile.id) {
            this.userId = this.userProfile.id;
            // Check if userId is defined before calling getCart
            if (this.userId !== undefined) {
              this.cartService.deleteCartByClientId(this.userId).subscribe(() => {
                // this.cartService.updateCartTotal(this.userId);
              });
            } else {
              console.error(
                'User ID is undefined. Handle this case appropriately.'
              );
            }
          } else {
            console.error(
              'User profile or user ID is missing. Handle this case appropriately.'
            );
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Token is null. Handle this case appropriately.');
    }
  }

  async addOrder(): Promise<void> {
    // Prepare order data
    const orderData = {
      orderDate: new Date().toISOString(),
      orderStatus: 0,
      orderTotal: this.totalPrice,
      clientId: this.userId,
    };
  
    // Call the addOrder method from the service to add the order
    this.orderService.addOrder(orderData).subscribe(
      (response) => {
        // Handle success response
        console.log('Order added successfully:', response);
  
        // Extract the orderId from the response
        const orderId: number = response.orderId;
  
        // Iterate through service charges and add order details
        for (const clientId in this.serviceCharges) {
          if (this.serviceCharges.hasOwnProperty(clientId)) {
            const charges = this.serviceCharges[clientId];            
            for (const charge of charges) {
              // Call addOrderDetail for each service charge
              this.addOrderDetail(orderId, charge.serviceChargesId);
              
            }
          }
        }
  
        this.toastr.success('Order placed successfully!', 'Success');
      },
      (error) => {
        // Handle error response
        console.error('Error adding order:', error);
        
        this.toastr.error('Error placing order', 'Error');
      }
    );
  }
  
  
  addOrderDetail(orderId: number, serviceChargeId: number) {
    this.orderService.addOrderDetail(orderId, serviceChargeId).subscribe(
      response => {
        // Handle success
        console.log('Order detail added successfully:', response);
      },
      error => {
        // Handle error
        console.error('Error adding order detail:', error);
      }
    );
  }
  
  

  pay(amount: any) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51OUUZ3LKYUk9aF2AEApyxIYiwUGMvSE0WUC6a81grdSwXomwY6riRnQpwDvTGwmpCcDkwbfVCWDTtogJ8xSbUtzA00MvGRvJDq',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        alert('Token Created!!');
        console.log("DELETE ID"+this.userProfile.id)
        this.deleteCart();
      },
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100,
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51OUUZ3LKYUk9aF2AEApyxIYiwUGMvSE0WUC6a81grdSwXomwY6riRnQpwDvTGwmpCcDkwbfVCWDTtogJ8xSbUtzA00MvGRvJDq',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            alert('Payment Success!!');
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }
}
