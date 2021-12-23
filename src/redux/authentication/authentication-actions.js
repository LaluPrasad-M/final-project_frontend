import {
  AUTH_LOADING,
  LOGIN,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actionTypes";

import cookie from 'js-cookie'


export const loading = () => {
  return {
    type: AUTH_LOADING,
    payload: {
      loading: true,
    },
  };
};

export const login = (data) => {
  cookie.set("x-access-token", JSON.stringify(data))
  return {
    type: LOGIN,
    payload: {
      loading: false,
      token: data.token,
      user: data.user
    },
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      loading: false,
      error: error,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: {
      loading: false,
    },
  };
};
