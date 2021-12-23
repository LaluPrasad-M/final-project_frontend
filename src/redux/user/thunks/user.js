import {
  loading_user_action,
  user_action_failure,
  fetch_products,
  fetch_product_details,
  fetch_cart_items,
  delete_user,
  update_user_details,
} from "../actions";

import { logout_ } from "../../authentication"

export const fetch_products_ = (query) => {
  return function (dispatch) {
    dispatch(loading_user_action());
    //localhost:3030/product?filter=name&order=-1
    fetch("http://localhost:3030/product?" + query)
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        if (response.success) {
          dispatch(fetch_products(response.data));
        } else {
          dispatch(user_action_failure(response.message));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(user_action_failure(error.message));
      });
  };
};

export const fetch_product_details_ = (id) => {
  return function (dispatch) {
    dispatch(loading_user_action());
    //localhost:3030/product/:id 
    fetch("http://localhost:3030/product/" + id)
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        if (response.success) {
          dispatch(fetch_product_details(response.data));
        } else {
          dispatch(user_action_failure(response.message));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(user_action_failure(error.message));
      });
  };
};


export const add_review_ = (product_id, token, review) => {
  return function (dispatch) {
    dispatch(loading_user_action());
    //localhost:3030/product/:id/review
    fetch("http://localhost:3030/product/" + product_id + "/review?token=" + token,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ review }),
      })
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        if (response.success) {
          dispatch(fetch_product_details_(product_id, token))
        } else if (response.status === 401) {
          dispatch(logout_())
        } else {
          dispatch(user_action_failure(response.message));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(user_action_failure(error.message));
      });
  };
};

export const fetch_cart_items_ = (token) => {
  return function (dispatch) {
    dispatch(loading_user_action());
    fetch("http://localhost:3030/user/cart?token=" + token)
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        if (response.success) {
          dispatch(fetch_cart_items(response.data));
        } else {
          dispatch(user_action_failure(response.message));
        }

      })
      .catch((error) => {
        console.log(error);
        dispatch(user_action_failure(error.message));
      });
  };
};

export const add_to_cart_ = (product_id, token) => {
  return function (dispatch) {
    dispatch(loading_user_action());
    fetch("http://localhost:3030/user/cart/" + product_id + "?token=" + token,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        console.log(response.message)
        if (response.success) {
          dispatch(fetch_cart_items_(token));
        } else {
          dispatch(user_action_failure());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(user_action_failure(error.message));
      });
  };
};


export const remove_from_cart_ = (product_id, token) => {
  return function (dispatch) {
    dispatch(loading_user_action());
    fetch("http://localhost:3030/user/cart/" + product_id + "/remove?token=" + token,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        console.log(response.message)
        if (response.success) {
          dispatch(fetch_cart_items_(token));
        } else {
          dispatch(user_action_failure());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(user_action_failure(error.message));
      });
  };
};



export const like_unlike_a_product_ = (product_id, token) => {
  return function (dispatch) {
    dispatch(loading_user_action());
    fetch("http://localhost:3030/product/likes/" + product_id + "?token=" + token,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        if (response.success) {
          dispatch(fetch_product_details_(product_id, token))
        } else {
          dispatch(user_action_failure(response.message));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(user_action_failure(error.message));
      });
  };
};

export const delete_user_ = (token) => {
  return function (dispatch) {
    dispatch(loading_user_action());
    fetch("http://localhost:3030/product?token=" + token,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      })
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout_())
        } else { return res.json() }
      })
      .then((response) => {
        console.log(response)
        dispatch(delete_user(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(user_action_failure(error.message));
      });
  };
};

export const update_user_details_ = (token, body) => {
  return function (dispatch) {
    dispatch(loading_user_action());
    fetch("http://localhost:3030/user?token=" + token,
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
        console.log(response)
        dispatch(update_user_details(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(user_action_failure(error.message));
      });
  };
};
