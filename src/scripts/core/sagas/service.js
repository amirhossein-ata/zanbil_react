import { takeLatest, call, put, all } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { post, get } from "../api/api";

export function* addService({ payload }) {
  try {
    yield call(post, "/service", payload.service, payload.token, true);
    payload.closeModal();
    yield put({
      type: ActionTypes.ADD_SERVICE_SUCCESS
    });
    yield put({
      type: ActionTypes.GET_BUSINESSES_REQUEST,
      payload: { token: payload.token }
    });
  } catch (err) {
    console.log(err);
  }
}

export function* takeAddService() {
  yield takeLatest(ActionTypes.ADD_SERVICE_REQUEST, addService);
}

export function* getService({ payload }) {
  try {
    const response = yield call(get, "/service", {}, payload.token, true);
    console.log(response);
    yield put({
      type: ActionTypes.GET_SERVICE_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
}

export function* takeGetService() {
  yield takeLatest(ActionTypes.GET_SERVICE_REQUEST, getService);
}

export default function* root() {
  yield all([takeGetService(), takeAddService()]);
}
