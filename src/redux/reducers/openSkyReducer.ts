import types from "../actions/types";
import { Status } from "../../types/Base";
import { OpenSkyFlight } from "../../types/OpenSky";

const initialState = {
  status: Status.None,
  error: "",
  flights: [],
};

interface State {
  status: Status,
  error: string,
  flights: Array<OpenSkyFlight>,
}

interface Action {
  error: string,
  flights: Array<OpenSkyFlight>,
  type: string,
}

interface SelectorsState { openSky: State }

export const openSkyReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case types.GET_FLIGHTS_SUCCESS: {
      return { ...state, error: '', flights: action.flights, status: Status.Success }
    }
    case types.GET_FLIGHTS_FAILED: {
      return { ...state, status: Status.Failed, error: action.error }
    }
    case types.GET_FLIGHTS_PENDING: {
      return { ...state, status: Status.Pending, error: '' }
    }

    default:
      return state;
  }
}

export const selectOpenSkyFlights = (state: SelectorsState) => state.openSky.flights;
export const selectOpenSkyStatus = (state: SelectorsState) => state.openSky.status;
export const selectOpenSkyError = (state: SelectorsState) => state.openSky.error;
