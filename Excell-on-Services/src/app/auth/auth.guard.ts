import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromUser from '../store/user/admin.reducer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromUser.IUserState>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(fromUser.selectUser).pipe(
      map((userState: fromUser.IUserState) => {
        if (userState.isLoggedIn) {
          return true;  
        } else {
          // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang login
          return this.router.createUrlTree(['/auth/adminlogin']);
        }
      })
    );
  }
}
