import { takeLatest, call, put, all } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { post } from "../api/api";

export function* postLogin({ payload }) {
  try {
    const response = yield call(post, "/api/auth/login", payload, false);
    console.log(response);
    yield put({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: {
        token: response.access_token
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.LOGIN_REQUEST, postLogin)]);
}
