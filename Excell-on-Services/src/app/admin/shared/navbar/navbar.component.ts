import { Component, ElementRef, Renderer2,  } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Popper from 'popper.js';
import { Observable } from 'rxjs';

import * as fromRoot from '../../../State/index';
import * as fromAdmin from '../../../State/admin';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
[x: string]: any;
  isSidebarOpen = false;

  isLoggedOut!: boolean;
  userEmail$: Observable<string> = new Observable();
  constructor(
    private store: Store<fromRoot.IAppState>,
    private router: Router,
    private el: ElementRef, private renderer: Renderer2
  ) {
    
  }

  ngOnInit(): void {
    this.userEmail$ = this.store.select(fromAdmin.getUserEmail);
    this.store.select(fromAdmin.getIsLoggedOut).subscribe((isLoggedOut) => {
      this.isLoggedOut = isLoggedOut;
    });
  }
  logout() {
    this.store.dispatch(new fromAdmin.Logout());
  }
   // Hàm để chuyển đổi trạng thái mở/đóng thanh điều hướng
   toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
}
