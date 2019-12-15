import axios from "axios";
import { GET_FANFIKS, GET_FANFIK_FOR_READ, CLEAR_READ_FANFIK } from "../actions/types";
import { returnErrors } from "./errorActions";

export const createFanfik = fanfik => (dispatch, getState) => {
  const { userName, userID, fanfikName, description, gener, tags, chapters } = fanfik;
  const body = JSON.stringify({
    userName,
    userID,
    fanfikName,
    description,
    gener,
    tags,
    chapters
  });
  axios
    .post("/api/fanfiks", body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_FANFIKS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getFanfik = () => (dispatch, getState) => {
  axios
    .get("/api/fanfiks", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_FANFIKS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getFanfikToRead = id => (dispatch, getState) => {
  axios
    .get(`/api/fanfiks/read${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_FANFIK_FOR_READ,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const closeFanfik = () => {
  return {
    type: CLEAR_READ_FANFIK
  };
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
