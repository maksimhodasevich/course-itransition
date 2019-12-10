import { CREATE_FANFIK_SUCCESS, GET_FANFIKS } from "../actions/types";

const initialState = {
  fanfik: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FANFIK_SUCCESS:
      return {
        ...state,
        fanfik: action.payload
      };
    case GET_FANFIKS:
      return {
        ...state,
        fanfik: action.payload
      };
    default:
      return state;
  }
};
