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

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  isLoading: false,
  user: null,
  regSuccess: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: action.payload
      };
    case REGISTER_PROCESS:
      return {
        ...state,
        regSuccess: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        regSuccess: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false,
        regSuccess: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
        isLoading: false
      };
    default:
      return state;
  }
};