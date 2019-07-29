import { ActionTypes } from "../actions/actionTyps";
import immutable from "immutability-helper";

const initialState = {
  state: "idle",
  token: "",
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return immutable(state, {
        state: { $set: "running" }
      });

    case ActionTypes.LOGIN_SUCCESS:
      return immutable(state, {
        state: { $set: "loaded" },
        token: { $set: action.payload.token },
        isAuthenticated: { $set: true }
      });
    case ActionTypes.LOGOUT:
      return immutable(state, {
        state: { $set: "idle" },
        token: { $set: "" },
        isAuthenticated: { $set: false }
      });
    default:
      return state;
  }
};
