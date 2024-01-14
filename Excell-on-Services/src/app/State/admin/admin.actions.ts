import { Action } from "@ngrx/store";

export enum EAdminActions {
    LOGIN = '[USER] Login',
    LOGIN_SUCCESS = '[USER] Login Success',
    LOGIN_FAIL = '[USER] Login Fail',
    LOGOUT = '[USER] Logout', 
  }
  
  export class Login implements Action {
    public readonly type = EAdminActions.LOGIN;
    constructor(public payload: { email: string; password: string }) {}
  }
  
  export class LoginSuccess implements Action {
    public readonly type = EAdminActions.LOGIN_SUCCESS;
    constructor(public payload: { userName: string, token: string }) {}
  }
  
  export class LoginFail implements Action {
    public readonly type = EAdminActions.LOGIN_FAIL;
    constructor() {}
  }
  export class Logout implements Action {
    readonly type = EAdminActions.LOGOUT;
  }
  
  export type AdminActions = Login | LoginSuccess | LoginFail | Logout;
  