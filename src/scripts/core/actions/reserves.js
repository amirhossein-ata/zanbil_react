import { ActionTypes } from "./actionTyps";

export const get_reserves = token => ({
  type: ActionTypes.GET_RESERVES_REQUEST,
  payload: { token }
});

export const add_reserve = (reserve, token) => ({
  type: ActionTypes.ADD_RESERVE_REQUEST,
  payload: { reserve, token }
});
