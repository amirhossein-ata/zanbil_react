import { combineReducers } from "redux";
import auth from "./auth";
import business from "./business";
import reserve from "./reserve";

export default combineReducers({
  auth,
  business,
  reserve
});
