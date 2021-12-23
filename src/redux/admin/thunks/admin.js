import {
  loading_admin_action,
  admin_action_failure,
  fetch_users,
  fetch_products_list,
  update_product_details,
} from "../actions";

import { logout_ } from "../../authentication"

export const fetch_products_list_ = (query) => {
  return function (dispatch) {
    dispatch(loading_admin_action());
    fetch("http://localhost:3030/product?" + query)
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        if (response.success) {
          dispatch(fetch_products_list(response.data));
        } else {
          dispatch(admin_action_failure(response.message));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(admin_action_failure(error.message));
      });
  };
};

export const fetch_users_ = (token) => {
  return function (dispatch) {
    dispatch(loading_admin_action());
    fetch("http://localhost:3030/user?token=" + token)
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        if (response.success) {
          dispatch(fetch_users(response.data));
        } else {
          dispatch(admin_action_failure(response.message));
        }
      })
      .catch((error) => {
        dispatch(admin_action_failure(error.message));
      });
  };
};

export const block_unblock_user_ = (user_id, token) => {
  return function (dispatch) {
    dispatch(loading_admin_action());
    fetch("http://localhost:3030/user/" + user_id + "/disable?token=" + token,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT"
      })
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        if (response.success) {
          dispatch(fetch_users_(token));
        } else {
          dispatch(admin_action_failure(response.message));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(admin_action_failure(error.message));
      });
  };
};

export const add_product_ = (token, body) => {
  return function (dispatch) {
    dispatch(loading_admin_action());
    fetch("http://localhost:3030/product?token=" + token,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      })
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        console.log(response)
        dispatch(fetch_products_list_(""));
      })
      .catch((error) => {
        console.log(error);
        dispatch(admin_action_failure(error.message));
      });
  };
};

export const update_product_details_ = (product_id, token, body) => {
  console.log(product_id)
  return function (dispatch) {
    dispatch(loading_admin_action());
    fetch("http://localhost:3030/product/" + product_id + "?token=" + token,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(body),
      })
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        if (response.success)
          dispatch(update_product_details(response.message));
        else {
          console.log(response.message)
          dispatch(admin_action_failure(response.message));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(admin_action_failure(error.message));
      });
  };
};

export const delete_product_ = (product_id, token) => {
  return function (dispatch) {
    dispatch(loading_admin_action());
    fetch("http://localhost:3030/product/" + product_id + "?token=" + token,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE"
      })
      .then(() => {
        dispatch(fetch_products_list_());
      })
      .catch((error) => {
        console.log(error);
        dispatch(admin_action_failure(error.message));
      });
  };
};