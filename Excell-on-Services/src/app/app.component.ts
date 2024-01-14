import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Excell-on';
  constructor(private activatedRoute: ActivatedRoute) {}

  isAdminPage(): boolean {
    return this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'admin';
  }

  isLoginPage(): boolean {    
    return this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'auth';
  }

  
}
