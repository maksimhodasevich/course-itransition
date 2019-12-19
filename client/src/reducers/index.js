import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import fanfikReducer from "./fanfikReducer";
import themeReducer from "./themeReducer";


export default combineReducers({
  user: userReducer,
  auth: authReducer,
  error: errorReducer,
  fanfik: fanfikReducer,
  theme: themeReducer
});
