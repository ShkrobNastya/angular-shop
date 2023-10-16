import { Action, createReducer, on } from '@ngrx/store';
import {
  loginFailureAction,
 loginSuccessAction,
 registerFailureAction,
 registerSuccessAction,
 logoutAction
} from '../actions/auth.action';
import { AuthStateInterface } from '../state.model';

const initialState: AuthStateInterface = {
  userEmail: null,
  isLoggedIn: false,
};

const authReducer = createReducer(
  initialState,
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      userEmail: action.user.email,
      isLoggedIn: true,
    }),
  ),
  on(
    registerFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      userEmail: null,
      isLoggedIn: false,
    }),
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      userEmail: action.user.email,
      isLoggedIn: true,
    }),
  ),
  on(
    loginFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      userEmail: null,
      isLoggedIn: false,
    }),
  ),
  on(
    logoutAction,
    (): AuthStateInterface => ({
      ...initialState,
    }),
  ),
);

export function reducer(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
