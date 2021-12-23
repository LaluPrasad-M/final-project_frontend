import {
  AUTH_LOADING,
  LOGIN,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actionTypes";

const INITIAL_STATE = {
  loading: false,
  token: "",
  error: "",
  user: ""
};

export const authenticationReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type)
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        error: "",
        loading: action.payload.loading,
        error: "",
      };
    case LOGIN:
      return {
        ...state,
        loading: action.payload.loading,
        token: action.payload.token,
        user: action.payload.user,
        error: "",
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
        token: "",
        user: "",
      };
    case LOGOUT:
      return {
        ...state,
        loading: action.payload.loading,
        token: "",
        user: "",
        error: "",
      };
    default:
      return state;
  }
};
