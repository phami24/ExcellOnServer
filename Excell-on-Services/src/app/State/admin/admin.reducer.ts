
import { IAdminLoginState, IAdminState } from './admin.states';
import { AdminActions, EAdminActions } from './admin.actions';

const initialLoginState: IAdminLoginState = {
  loading: false,
  success: false,
  fail: false,
  userName: '',
  token: null,
};

const initialState: IAdminState = {
  login: initialLoginState,
};

export function adminReducer(
  state = initialState,
  action: AdminActions
): IAdminState {
  switch (action.type) {
    case EAdminActions.LOGIN:
      return {
        ...state,
        login: { ...initialLoginState, loading: true },
      };
    case EAdminActions.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          success: true,
          userName: action.payload.userName,
          token: action.payload.token,
        },
      };
    case EAdminActions.LOGIN_FAIL:
      return {
        ...state,
        login: { ...state.login, loading: false, fail: true },
      };

    case EAdminActions.LOGOUT:
      return {
        ...state,
        login: initialLoginState,
      };

    default:
      return state;
  }
}
