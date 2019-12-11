import {
  GET_USERS,
  // DELETE_USERS,
  // APPOINT_ADMIN,
  // REMOVE_ADMIN
} from "../actions/types";

const initialState = {
  users: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    // case DELETE_USERS:
    //   return {
    //     ...state,
    //     users: action.payload
    //   };
    // case APPOINT_ADMIN:
    //   return {
    //     ...state,
    //     users: action.payload
    //   };
    // case REMOVE_ADMIN:
    //   return {
    //     ...state,
    //     users: action.payload
    //   };
    default:
      return state;
  }
};
