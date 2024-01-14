export interface IAdminLoginState {
  loading: boolean;
  success: boolean;
  fail: boolean;
  userName: string;
  token: string | null;
}

export interface IAdminState {
  login: IAdminLoginState;
}
