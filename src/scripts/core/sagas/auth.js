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

export function* takeLogin() {
  yield takeLatest(ActionTypes.LOGIN_REQUEST, postLogin);
}

export function* postSignup({ payload }) {
  try {
    console.log("got");
    const response = yield call(post, "/api/auth/signup", payload, false);
    console.log(response);
    const credentials = {
      email: payload.email,
      password: payload.password
    };
    const loginResponse = yield call(
      post,
      "/api/auth/login",
      credentials,
      false
    );
    console.log(loginResponse);
    yield put({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: {
        token: loginResponse.access_token
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export function* takeSignUp() {
  yield takeLatest(ActionTypes.SIGNUP_REQUEST, postSignup);
}

export default function* root() {
  yield all([takeLogin(), takeSignUp()]);
}
