import { takeLatest, call, put, all } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { get } from "../api/api";

export function* getUserInfo({ payload }) {
  try {
    const response = yield call(get, "/user", {}, payload.token, true);
    console.log(response);
    yield put({
      type: ActionTypes.GET_USER_INFO_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
}

export function* takeGetUsers() {
  yield takeLatest(ActionTypes.GET_USER_INFO_REQUEST, getUserInfo);
}

export default function* root() {
  yield all([takeGetUsers()]);
}
