import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/user/admin.actions';
import { IUserState, selectUser } from '../../../store/user/admin.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  userState!: IUserState;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private store: Store,
    private router: Router
  ) {
    this.store.select(selectUser).subscribe((userState: IUserState) => {
      this.userState = userState;
    });
  }

  ngAfterViewInit() {
    this.setupSidebarDropdown();
  }

  private setupSidebarDropdown() {
    const dropdownToggleElements = this.el.nativeElement.querySelectorAll(
      '.sidebar-dropdown-toggle'
    );
    // @ts-ignore
    dropdownToggleElements.forEach((item) => {
      this.renderer.listen(item, 'click', (event: Event) => {
        event.preventDefault();
        const parent = item.closest('.group');
        if (parent.classList.contains('selected')) {
          parent.classList.remove('selected');
        } else {
          document
            .querySelectorAll('.sidebar-dropdown-toggle')
            .forEach(function (i) {
              i.closest('.group')?.classList.remove('selected');
            });
          parent.classList.add('selected');
        }
      });
    });
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  confirmLogout() {
    const isConfirmed = window.confirm('Are you sure you want to logout?');
    if (isConfirmed) {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('loginEmail');
      this.store.dispatch(AuthActions.logout());
      this.router.navigateByUrl('/auth/adminlogin');
    }
  }
}
