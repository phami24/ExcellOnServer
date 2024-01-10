import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';
import * as fromClient from './client';

export interface IAppState{
    client: fromClient.IClientState;
}

export const appReducer: ActionReducerMap<IAppState> = {
    client: fromClient.clientReducer as ActionReducer<fromClient.IClientState, Action>,
  };
  