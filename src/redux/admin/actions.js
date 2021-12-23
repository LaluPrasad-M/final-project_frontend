import {
  LOADING_ADMIN_ACTION,
  ADMIN_ACTION_FAILURE,
  FETCH_USERS,
  FETCH_PRODUCTS_LIST,
  UPDATE_PRODUCT_DETAILS,
} from "../actionTypes";

export const loading_admin_action = () => {
  return {
    type: LOADING_ADMIN_ACTION,
    payload: {
      loading: true,
    },
  };
};

export const admin_action_failure = (error) => {
  return {
    type: ADMIN_ACTION_FAILURE,
    payload: {
      loading: false,
      error: error,
    },
  };
};

export const fetch_users = (data) => {
  return {
    type: FETCH_USERS,
    payload: {
      loading: false,
      data: data,
    },
  };
};


export const fetch_products_list = (data) => {
  return {
    type: FETCH_PRODUCTS_LIST,
    payload: {
      loading: false,
      data: data
    },
  };
};

export const update_product_details = (data) => {
  return {
    type: UPDATE_PRODUCT_DETAILS,
    payload: {
      data: data,
      loading: false
    },
  };
};
