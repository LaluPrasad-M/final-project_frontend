import * as actionTypes from "../actionTypes";

const INITIAL_STATE = {
  loading: false,
  current_product: {},
  products: [],
  cart_items: [],
  error: ""
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_USER_ACTION:
      return {
        ...state,
        error:"",
        loading: action.payload.loading,
      };
    case actionTypes.USER_ACTION_FAILURE:
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
      };
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        loading: action.payload.loading,
        products: action.payload.data,
        error: ""
      };
    case actionTypes.FETCH_PRODUCT_DETAILS:
      return {
        ...state,
        loading: action.payload.loading,
        current_product: {
          data: action.payload.data
        },
        error: ""
      };
    case actionTypes.FETCH_CART_ITEMS:
      return {
        ...state,
        loading: action.payload.loading,
        cart_items: action.payload.data
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        loading: action.payload.loading,
        error: ""
      };
    case actionTypes.UPDATE_USER_DETAILS:
      return {
        ...state,
        loading: action.payload.loading,
        error: ""
      };
    default:
      return state;
  }
};

export default userReducer;
