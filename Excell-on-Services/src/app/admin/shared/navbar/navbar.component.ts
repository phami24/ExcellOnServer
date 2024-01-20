import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Popper from 'popper.js';
import { Observable, filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import * as fromRoot from '../../../State/index';
import * as fromAdmin from '../../../State/admin';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  pageTitleFromRoute: string = '';

  [x: string]: any;
  isSidebarOpen = false;

  isLoggedOut!: boolean;
  userEmail$: Observable<string> = new Observable();
  constructor(
    private store: Store<fromRoot.IAppState>,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setPageTitleFromRoute();
      });

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

  private setPageTitleFromRoute(): void {
    // Get the current route
    const currentRoute = this.route.root;

    // Traverse the route tree to find the last activated route
    let lastActivatedRoute = currentRoute;
    while (lastActivatedRoute.firstChild) {
      lastActivatedRoute = lastActivatedRoute.firstChild;
    }

    // Extract the title from the route data
    this.pageTitleFromRoute =
      lastActivatedRoute.snapshot.data['title'] || 'Default Title';
  }
}
