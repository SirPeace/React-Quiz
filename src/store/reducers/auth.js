import { AUTH_LOGIN, AUTH_LOGOUT } from "../actions/actionTypes";

const initialState = {
  token: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return { ...state, token: action.token };
    case AUTH_LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
}
