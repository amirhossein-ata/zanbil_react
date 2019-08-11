import { ActionTypes } from "./actionTyps";

export const get_user_info = token => ({
  type: ActionTypes.GET_USER_INFO_REQUEST,
  payload: { token }
});
