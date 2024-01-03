import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Excell-on';
  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url.includes('/login');
  }
  isRegisterPage(): boolean {
    return this.router.url.includes('/register');
  }
}
