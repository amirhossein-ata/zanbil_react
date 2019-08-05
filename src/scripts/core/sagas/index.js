import { all, fork } from "redux-saga/effects";
import auth from "./auth";
import business from "./business";
import service from "./service";
import reserve from "./reserve";

export default function* root() {
  yield all([fork(auth), fork(business), fork(service), fork(reserve)]);
}
