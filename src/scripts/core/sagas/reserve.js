import { takeLatest, call, put, all } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { post, get } from "../api/api";

export function* addReserve({ payload }) {
  try {
    yield call(post, "/reserve", payload.reserve, payload.token, true);
    yield put({
      type: ActionTypes.ADD_RESERVE_SUCCESS
    });
    yield put({
      type: ActionTypes.GET_RESERVES_REQUEST,
      payload: { token: payload.token }
    });
  } catch (err) {
    console.log(err);
  }
}

export function* takeAddReserves() {
  yield takeLatest(ActionTypes.ADD_RESERVE_REQUEST, addReserve);
}

export function* getReserves({ payload }) {
  try {
    const response = yield call(get, "/reserve", {}, payload.token, true);
    console.log(response);
    yield put({
      type: ActionTypes.GET_RESERVES_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
}

export function* takeGetReserves() {
  yield takeLatest(ActionTypes.GET_RESERVES_REQUEST, getReserves);
}

export default function* root() {
  yield all([takeAddReserves(), takeGetReserves()]);
}
