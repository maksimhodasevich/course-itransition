import { CREATE_FANFIK_SUCCESS, GET_FANFIKS, GET_CHAPTERS } from "../actions/types";

const initialState = {
  fanfik: [],
  chapters: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FANFIK_SUCCESS:
    case GET_FANFIKS:
      return {
        ...state,
        fanfik: action.payload
      };
      case GET_CHAPTERS:
        return {
          ...state,
          chapters: action.payload
        };
    default:
      return state;
  }
};
