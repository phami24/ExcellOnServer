import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';
import * as fromClient from './client';
import * as fromAdmin from './admin';

export interface IAppState{
    client: fromClient.IClientState;
    admin: fromAdmin.IAdminState;
}

export const appReducer: ActionReducerMap<IAppState> = {
    client: fromClient.clientReducer as ActionReducer<fromClient.IClientState, Action>,
    admin: fromAdmin.adminReducer as ActionReducer<fromAdmin.IAdminState, Action>,
  };

  