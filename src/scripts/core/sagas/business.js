import { takeLatest, call, put, all } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { post, get } from "../api/api";

export function* addBusiness({ payload }) {
  try {
    yield call(post, "/business", payload.business, payload.token, true);
    yield put({
      type: ActionTypes.ADD_BUSINESS_SUCCESS
    });
    payload.history.push("/business");
  } catch (err) {
    console.log(err);
  }
}

export function* takeAddBusiness() {
  yield takeLatest(ActionTypes.ADD_BUSINESS_REQUEST, addBusiness);
}

export function* getBusinesses({ payload }) {
  try {
    const response = yield call(get, "/business", {}, payload.token, true);
    console.log(response);
    yield put({
      type: ActionTypes.GET_BUSINESSES_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
}

export function* takeGetBusinesses() {
  yield takeLatest(ActionTypes.GET_BUSINESSES_REQUEST, getBusinesses);
}

export default function* root() {
  yield all([takeAddBusiness(), takeGetBusinesses()]);
}
