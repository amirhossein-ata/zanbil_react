import { ActionTypes } from "../actions/actionTyps";
import immutable from "immutability-helper";

const initialState = {
  state: "idle",
  businesses: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BUSINESS_REQUEST:
      return immutable(state, {
        state: { $set: "running" }
      });

    case ActionTypes.ADD_BUSINESS_SUCCESS:
      return immutable(state, {
        state: { $set: "loaded" }
      });

    case ActionTypes.GET_BUSINESSES_REQUEST:
      return immutable(state, {
        state: { $set: "running" }
      });

    case ActionTypes.GET_BUSINESSES_SUCCESS:
      return immutable(state, {
        state: { $set: "loaded" },
        businesses: { $set: action.payload }
      });

    default:
      return state;
  }
};
