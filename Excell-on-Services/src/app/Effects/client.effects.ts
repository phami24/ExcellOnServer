import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { ClientService } from '../auth/services/client.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as fromClient from '../State/client/client.actions';
import { of } from 'rxjs';

@Injectable()
export class ClientEffects {
  constructor(
    private actions: Actions,
    private clientService: ClientService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromClient.EClientActions.LOGIN),
      switchMap((action: fromClient.Login) => {
        const { email, password } = action.payload;
        return this.clientService.login(email, password).pipe(
          map((response) => {
            if (response.result) {
              // Save token to local storage
              localStorage.setItem('token', response.token);

              // Trigger an alert for successful login
              alert('Login Successfully!');

              // Navigate to a component that displays the alert

              return new fromClient.LoginSuccess({
                userName: email,
                token: response.token,
              });
            } else {
              // Trigger an alert for unsuccessful login
              alert('Login Failed!');
              return new fromClient.LoginFail();
            }
          }),
          catchError(() => {
            // Trigger an alert for unsuccessful login due to an error
            alert('Login Failed due to an error!');
            return of(new fromClient.LoginFail());
          })
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromClient.EClientActions.REGISTER),
      switchMap((action: fromClient.Register) => {
        const { firstName, lastName, email, password } = action.payload;
        return this.clientService
          .register({ firstName, lastName, email, password })
          .pipe(
            map((response) => {
              if (response.result) {
                // Save token to local storage
                localStorage.setItem('token', response.token);

                // Trigger an alert for successful registration
                alert('Registration Successful!');

                // Navigate to a component that displays the alert

                return new fromClient.RegisterSuccess({
                  token: response.token,
                });
              } else {
                // Trigger an alert for unsuccessful registration
                alert('Registration Failed!');
                return new fromClient.RegisterFail();
              }
            }),
            catchError(() => {
              // Trigger an alert for unsuccessful registration due to an error
              alert('Registration Failed due to an error!');
              return of(new fromClient.RegisterFail());
            })
          );
      })
    )
  );

  // New effect for handling LOGOUT
  logout$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromClient.EClientActions.LOGOUT),
      tap(() => {
        // Clear token from local storage
        localStorage.removeItem('token');
        alert('Logout Successfully!');
      })
    ),
    { dispatch: false } 
  );
}
