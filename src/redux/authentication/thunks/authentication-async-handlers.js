import {
  loading,
  login,
  loginFailure,
  logout
} from "../authentication-actions";

import cookie from 'js-cookie'

const HOST = "localhost";
const PORT = 3030;

export const userAutoLogin = () => {
  return function (dispatch) {
    const token = cookie.get("x-access-token")
    if (token) {
      dispatch(login(JSON.parse(token)));
    }
  }
}


export const userLogin = (email, password, role) => {
  return function (dispatch) {
    dispatch(loading());
    fetch("http://" + HOST + ":" + PORT + "/user/login?role=" + role, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          cookie.set("x-access-token", JSON.stringify(response))
          dispatch(login(response));
          window.location.reload()
        } else {
          dispatch(loginFailure(response.message));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFailure(error.message));
      });
  };
};


export const userRegister = (body) => {
  return function (dispatch) {
    dispatch(loading());
    fetch("http://" + HOST + ":" + PORT + "/user/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          cookie.set("x-access-token", JSON.stringify(response))
          dispatch(login(response));
          window.location.reload()
        } else {
          dispatch(loginFailure(response.message));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFailure(error.message));
      });
  };
};

export const logout_ = () => {
  return function (dispatch) {
    dispatch(logout());
    cookie.remove('x-access-token');
    window.location.reload()
  }
}