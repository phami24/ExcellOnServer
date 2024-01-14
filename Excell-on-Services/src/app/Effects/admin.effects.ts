import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';

import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as fromAdmin from '../State/admin/admin.actions';
import { of } from 'rxjs';
import { AdminService } from '../auth/services/admin.service';

@Injectable()
export class AdminEffects {
  constructor(
    private actions: Actions,
    private AdminService: AdminService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromAdmin.EAdminActions.LOGIN),
      switchMap((action: fromAdmin.Login) => {
        const { email, password } = action.payload;
        return this.AdminService.login(email, password).pipe(
          map((response) => {
            if (response.result) {
              // Save token to local storage
              localStorage.setItem('token', response.token);

              // Trigger an alert for successful login
              // alert('Login Successfully!');

              // Navigate to a component that displays the alert

              return new fromAdmin.LoginSuccess({
                userName: email,
                token: response.token,
              });
            } else {
              // Trigger an alert for unsuccessful login
              // alert('Login Failed!');
              return new fromAdmin.LoginFail();
            }
          }),
          catchError(() => {
            // Trigger an alert for unsuccessful login due to an error
            // alert('Login Failed due to an error!');
            return of(new fromAdmin.LoginFail());
          })
        );
      })
    )
  );

  

  // New effect for handling LOGOUT
  logout$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromAdmin.EAdminActions.LOGOUT),
      tap(() => {
        // Clear token from local storage
        localStorage.removeItem('token');
        // alert('Logout Successfully!');
      })
    ),
    { dispatch: false } 
  );
}
