import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";
import { returnErrors } from "./errorActions";

//check token and load user
export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    }
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//reg user
export const register = ({ name, email, password }) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //Request body
  const body = JSON.stringify({
    name: name,
    email: email,
    password: password
  });

  axios
    .post("/api/reg", body, config)
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

//login user
export const login = ({ email, password }) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //Request body
  const body = JSON.stringify({
    email: email,
    password: password
  });

  axios
    .post("/api/auth", body, config)
    .then(res => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        })
      }
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
    
};

// Setup config/header and token
export const tokenConfig = getState => {
  //Get token from localstorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //If token => add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
