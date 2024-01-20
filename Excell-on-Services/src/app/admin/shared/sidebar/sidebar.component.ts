import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';


import * as fromRoot from '../../../State/index';
import * as fromAdmin from '../../../State/admin';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  collapseShow = "hidden";
  isSidebarOpen = false;
  isLoggedOut!: boolean;
  constructor(
    private store: Store<fromRoot.IAppState>,
    private router: Router,
    private el: ElementRef, private renderer: Renderer2,
    private toastr: ToastrService,
  ) {
    
  }
  ngOnInit(): void {
    this.store.select(fromAdmin.getIsLoggedOut).subscribe((isLoggedOut) => {
      this.isLoggedOut = isLoggedOut;
    });
  }
  logout() {
    const confirmLogout = confirm('Are you sure you want to log out?');
    
    if (confirmLogout) {
      this.toastr.success('Logout successful!', 'Success');
      this.store.dispatch(new fromAdmin.Logout());
    }
  }

  ngAfterViewInit() {
    this.setupSidebarDropdown();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  getSidebarState() {
    return this.isSidebarOpen ? 'sm:flex' : 'hidden';
  }
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }
  private setupSidebarDropdown() {
    const dropdownToggleElements = this.el.nativeElement.querySelectorAll('.sidebar-dropdown-toggle');
    // @ts-ignore
    dropdownToggleElements.forEach(item => {
      this.renderer.listen(item, 'click', (event: Event) => {
        event.preventDefault();
        const parent = item.closest('.group');
        if (parent.classList.contains('selected')) {
          parent.classList.remove('selected');
        }else {
          document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function(i) {
            i.closest('.group')?.classList.remove('selected');
          })
          parent.classList.add('selected');
        }
      });
    });
  }
}
