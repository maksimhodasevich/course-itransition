import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import fanfikReducer from "./fanfikReducer";

export default combineReducers({
  user: userReducer,
  auth: authReducer,
  error: errorReducer,
  fanfik: fanfikReducer
});
