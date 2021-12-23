import {
  LOADING_USER_ACTION,
  USER_ACTION_FAILURE,
  FETCH_PRODUCTS,
  FETCH_PRODUCT_DETAILS,
  FETCH_CART_ITEMS,
  DELETE_USER,
  UPDATE_USER_DETAILS,
} from "../actionTypes";

export const loading_user_action = () => {
  return {
    type: LOADING_USER_ACTION,
    payload: {
      loading: true,
    },
  };
};

export const user_action_failure = (error) => {
  return {
    type: USER_ACTION_FAILURE,
    payload: {
      loading: false,
      error: error,
    },
  };
};

export const fetch_products = (data) => {
  return {
    type: FETCH_PRODUCTS,
    payload: {
      loading: false,
      data: data,
    },
  };
};

export const fetch_product_details = (data) => {
  return {
    type: FETCH_PRODUCT_DETAILS,
    payload: {
      loading: false,
      data: data,
    },
  };
};

export const fetch_cart_items = (data) => {
  return {
    type: FETCH_CART_ITEMS,
    payload: {
      loading: false,
      data: data,
    },
  };
};

export const delete_user = (data) => {
  return {
    type: DELETE_USER,
    payload: {
      data: data,
      loading: false,
    },
  };
};

export const update_user_details = () => {
  return {
    type: UPDATE_USER_DETAILS,
    payload: {
      loading: false,
    },
  };
};
