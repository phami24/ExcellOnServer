import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromUser from './store/user/admin.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Excell-on';
  constructor(private activatedRoute: ActivatedRoute,private store: Store<fromUser.IUserState>, private router: Router) {}

  isAdminPage(): boolean {
    return this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'admin';
  }

  isLoginPage(): boolean {    
    return this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'auth';
  }

  // isRegisterPage(): boolean {    
  //   return this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'register';
  // }

  ngOnInit(): void {
    this.store.select<fromUser.IUserState>(fromUser.selectUser).subscribe((userState: fromUser.IUserState) => {
      if (userState.isLoggedIn) {
        this.router.navigateByUrl('/admin');
      }
    });
  }
  
}
