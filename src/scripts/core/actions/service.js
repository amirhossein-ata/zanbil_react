import { ActionTypes } from "./actionTyps";

export const add_service = (service, token, closeModal) => ({
  type: ActionTypes.ADD_SERVICE_REQUEST,
  payload: { service, token, closeModal }
});

export const get_service = token => ({
  type: ActionTypes.GET_SERVICE_REQUEST,
  payload: { token }
});
