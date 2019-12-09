import axios from "axios";
import { GET_USERS, DELETE_USERS } from "../actions/types";
import { returnErrors } from "./errorActions";

export const getUsers = () => (dispatch, getState) => {
  axios
    .get("/api/users", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteUsers = checkedUsers => (dispatch, getState) => {
  // console.log(checkedUsers);
  const body = JSON.stringify({
    ids: checkedUsers
  });
  axios
    .delete("/api/users", body)
    .then(res => {
      console.log(res);
      return 'hey'
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const tokenConfig = getState => {
  const token = getState().auth.token;
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
