import types from "./types";
import { OpenSkyFlight } from "../../types/OpenSky";

export default {
  getFlights: (beginTimestamp: number, endTimestamp: number) => ({
    type: types.GET_FLIGHTS,
    begin: beginTimestamp,
    end: endTimestamp,
  }),
  getFlightsPending: () => ({
    type: types.GET_FLIGHTS_PENDING,
  }),
  getFlightsFailed: (error: string) => ({
    type: types.GET_FLIGHTS_FAILED,
    error,
  }),
  getFlightsSuccess: (flights: Array<OpenSkyFlight>) => ({
    type: types.GET_FLIGHTS_SUCCESS,
    flights,
  }),
}