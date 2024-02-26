import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { ServiceCharge } from 'src/app/interfaces/serviceCharge';
import { ProfileService } from '../../services/profile/profile.service';

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
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private profileService: ProfileService,
  ) {}
  handler: any = null;
  ngOnInit() {
    this.loadStripe();
    if (this.token !== null) {
      this.profileService.GetProfileByJwt(this.token).subscribe(
        (response) => {
          this.userProfile = response.userProfile;
          console.log(this.userProfile);
          // Check if userProfile is not null and has id property
          if (this.userProfile && this.userProfile.id) {
            this.userId = this.userProfile.id;
            // Check if userId is defined before calling getCart
            if (this.userId !== undefined) {
              this.getCart(this.userId);
            } else {
              console.error('User ID is undefined. Handle this case appropriately.');
            }
          } else {
            console.error('User profile or user ID is missing. Handle this case appropriately.');
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
  getCart(clientId: number): void {
    // Check if service charges for this clientId already exist
    if (!this.serviceCharges[clientId]) {
      this.cartService.getCartByClientId(clientId).subscribe({
        next: (data) => {
          // Store service charges in an object using clientId as key
          this.serviceCharges[clientId] = data;
          console.log(clientId);
        },
        error: (e) => console.error(e),
      });
    }
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
