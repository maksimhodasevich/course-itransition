import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  REGISTER_PROCESS,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";
import { returnErrors } from "./errorActions";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  axios.get("/api/auth/user", tokenConfig(getState))
    .then(res => {
      if (res.data && !res.data.blocked) {
        dispatch({
          type: USER_LOADED,
          payload: res.data
        });
      }
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const login = ({ email, password }) => dispatch => {
  const body = JSON.stringify({
    email: email,
    password: password
  });
  axios.post("/api/auth", body, tokenConfig())
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const register = ({ name, email, password }) => dispatch => {
  const body = JSON.stringify({
    name: name,
    email: email,
    password: password
  });
  axios.post("/api/reg", body, tokenConfig())
    .then(() =>
      dispatch({
        type: REGISTER_PROCESS
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS
  };
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const tokenConfig = getState => {
  let token = false;
  if (getState) {
    token = getState().auth.token;
  }
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
