import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  constructor() {}
  handler: any = null;
  ngOnInit() {
    this.loadStripe();
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
