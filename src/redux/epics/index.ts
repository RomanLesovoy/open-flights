import { combineEpics } from "redux-observable";

import {
  signInEpic,
  logoutEpic,
} from "./auth";
import {
  getFlightsEpic,
} from "./openSky";

export default combineEpics(
  signInEpic,
  logoutEpic,
  getFlightsEpic,
);
