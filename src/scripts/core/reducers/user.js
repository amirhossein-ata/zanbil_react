import { ActionTypes } from "../actions/actionTyps";
import immutable from "immutability-helper";

const initialState = {
  state: "idle",
  userInfo: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_INFO_REQUEST:
      return immutable(state, {
        state: { $set: "running" }
      });

    case ActionTypes.GET_USER_INFO_SUCCESS:
      return immutable(state, {
        state: { $set: "loaded" },
        userInfo: { $set: action.payload }
      });

    default:
      return state;
  }
};
