import { SWITCH_THEME } from "../actions/types";

const initialState = {
  theme: "light"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
};
