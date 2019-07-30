import { ActionTypes } from "./actionTyps";

export const add_business = (business, token, history) => ({
  type: ActionTypes.ADD_BUSINESS_REQUEST,
  payload: { business, token, history }
});

export const get_businesses = token => ({
  type: ActionTypes.GET_BUSINESSES_REQUEST,
  payload: { token }
});
