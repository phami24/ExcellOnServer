import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/user/admin.actions';
import { IUserState, selectUser } from '../../../store/user/admin.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  userState!: IUserState; 

  constructor(private store: Store, private router: Router) {
    this.store.select(selectUser).subscribe((userState: IUserState) => {
      this.userState = userState;
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

