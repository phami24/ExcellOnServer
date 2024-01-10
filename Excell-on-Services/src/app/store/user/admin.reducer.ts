// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './admin.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface IUserState {
  isLoggedIn: boolean;
  token: string | null;
  email: string | null;
  error: string | null;
}

export const initialUserState: IUserState = {
  isLoggedIn: false,
  token: null,
  email: null,
  error: null,
};

export const userReducer = createReducer(
  initialUserState,
  on(AuthActions.loginSuccess, (state, { token, email }) => ({ ...state, isLoggedIn: true, token, email, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, isLoggedIn: false, token: null, error })),
  on(AuthActions.logout, state => ({ ...state, isLoggedIn: false, token: null, email: null })),
);

export const selectUserState = createFeatureSelector<IUserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: IUserState) => state
);