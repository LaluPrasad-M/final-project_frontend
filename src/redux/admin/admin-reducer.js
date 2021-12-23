import * as actionTypes from "../actionTypes";

const INITIAL_STATE = {
  loading: false,
  users: [],
  products: [],
  error: "",
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_ADMIN_ACTION:
      return {
        ...state,
        error: "",
        loading: action.payload.loading,
      }
    case actionTypes.ADMIN_ACTION_FAILURE:
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
        users: [],
        products: []
      }
    case actionTypes.FETCH_PRODUCTS_LIST:
      return {
        ...state,
        loading: action.payload.loading,
        products: action.payload.data,
        error: ""
      };
    case actionTypes.FETCH_USERS:
      return {
        ...state,
        loading: action.payload.loading,
        users: action.payload.data,
        error: ""
      };
    case actionTypes.UPDATE_PRODUCT_DETAILS:
      return {
        ...state,
        loading: action.payload.loading,
        products: action.payload.data,
        error: ""
      };
    default:
      return state;
  }
};

export default adminReducer;
