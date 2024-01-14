import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IAdminLoginState, IAdminState } from './admin.states';

const getAdminState = createFeatureSelector<IAdminState>('admin');


export const getLoginState = createSelector(
  getAdminState,
  (state: IAdminState) => state.login
);

export const getLoadingLogin = createSelector(
  getLoginState,
  (loginState: IAdminLoginState) => loginState.loading
);

export const getSuccessLogin = createSelector(
  getLoginState,
  (loginState: IAdminLoginState) => loginState.success
);

export const getFailLogin = createSelector(
  getLoginState,
  (loginState: IAdminLoginState) => loginState.fail
);

export const getToken = createSelector(
  getLoginState,
  (loginState: IAdminLoginState) => loginState.token
);

export const getUserEmail = createSelector(
  getLoginState,
  (loginState: IAdminLoginState) => loginState.userName
);


export const getIsLoggedOut = createSelector(
  getLoginState,
  (loginState: IAdminLoginState) =>
    !loginState.loading  && !loginState.success
);
