import { ActionTypes } from "../actions/actionTyps";
import immutable from "immutability-helper";

const initialState = {
  state: "idle"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return immutable(state, {
        state: { $set: "running" }
      });
    default:
      return state;
  }
};
