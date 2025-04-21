import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/user.model';
import { AuthActionTypes } from '../action-types/auth-action-types';

export const registerAction = createAction(
  AuthActionTypes.REGISTER,
  props<{ email: string; password: string }>()
);
export const registerSuccessAction = createAction(
  AuthActionTypes.REGISTER_SUCCESS,
  props<{ user: User }>()
);
export const registerFailureAction = createAction(
  AuthActionTypes.REGISTER_FAILURE,
  props<{ error: any }>()
);
export const loginAction = createAction(
  AuthActionTypes.LOGIN_USER,
  props<{ email: string; password: string }>()
);
export const loginSuccessAction = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ user: User }>()
);
export const loginFailureAction = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ error: any }>()
);
export const logoutAction = createAction(AuthActionTypes.LOGOUT);
