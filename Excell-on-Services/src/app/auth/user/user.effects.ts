import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { beginRegister, emptyaction, showalert } from './user.action';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class UserEffect {
  constructor(
    private action$: Actions,
    private service: UserService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {}

  _userregister = createEffect(() =>
    this.action$.pipe(
      ofType(beginRegister),
      exhaustMap((action) => {
        return this.service.UserRegistration(action.userdata).pipe(
          map(() => {
            this.router.navigate(['login']);
            return showalert({
              message: 'Registered successfully.',
              resulttype: 'pass',
            });
          }),
          catchError((error) =>
            of(
              showalert({
                message: 'Registerion Failed:.' + error.message,
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );


  _showalert = createEffect(() =>
    this.action$.pipe(
      ofType(showalert),
      exhaustMap((action) => {
        return this.Shownackbaralert(action.message, action.resulttype).afterDismissed().pipe(
          map(() => {
            return emptyaction();
          })
        );
      })
    )
  );

  Shownackbaralert(message:string, resulttype:string ='fail'){
    let _class =resulttype === 'fail' ? 'green-snackbar':'red-snackbar'
    return this._snackbar.open(message, 'OK',{
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
        panelClass:[_class]
    })
  };

  

}
