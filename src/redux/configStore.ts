import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";

import { rootReducer } from "./rootReducer";
import combineEpics from "./epics";
import AuthApi from "../services/AuthApi";
import OpenSkyApi from "../services/OpenSkyApi";

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    authApi: new AuthApi(),
    openSkyApi: new OpenSkyApi(),
  }
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(combineEpics);
