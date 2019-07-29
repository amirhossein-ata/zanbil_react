import { all, fork } from "redux-saga/effects";
import login from "./auth";

export default function* root() {
  yield all([fork(login)]);
}
