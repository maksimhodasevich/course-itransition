import {
  GET_FANFIKS,
  GET_FANFIK_FOR_READ,
  CLEAR_READ_FANFIK,
  GET_CHAPTERS
} from "../actions/types";

const initialState = {
  fanfik: [],
  chapters: [],
  readFanfikInfo: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FANFIKS:
      return {
        ...state,
        fanfik: action.payload
      };
    case GET_FANFIK_FOR_READ:
      return {
        ...state,
        readFanfikInfo: action.payload
      };
    case GET_CHAPTERS:
      return {
        ...state,
        chapters: action.payload
      };
    case CLEAR_READ_FANFIK:
      return {
        ...state,
        readFanfikInfo: null
      };
    default:
      return state;
  }
};