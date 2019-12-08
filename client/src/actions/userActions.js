import axios from "axios";
import { GET_USERS } from "../actions/types";
import { returnErrors } from "./errorActions";

export const getUsers = () => dispatch => {
  const config = {
    headers: {
      "x-auth-token": localStorage.getItem("token")
    }
  };
  // Get users list
  axios
    .get("/api/users", config)
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
