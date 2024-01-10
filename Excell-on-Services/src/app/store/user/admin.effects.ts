// user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AuthActions from './admin.actions';
import { UserService } from './admin.service';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          map((response: any) => AuthActions.loginSuccess({ token: response.token, email })),
          catchError((error) => of(AuthActions.loginFailure({ error: 'Invalid credentials' })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
