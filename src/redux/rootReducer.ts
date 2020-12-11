import { combineReducers } from "redux";

import {
  authReducer as auth,
  openSkyReducer as openSky,
} from "./reducers";

export const rootReducer = combineReducers({
  auth,
  openSky,
});
