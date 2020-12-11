import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import types from "../actions/types";
import Actions from "../actions";
import { OpenSkyFlight } from "../../types/OpenSky";

export const getFlightsEpic = (action$: any, state$: any, { openSkyApi }: any) => {
  return action$.pipe(
    ofType(types.GET_FLIGHTS),
    switchMap((action: { begin: number, end: number }) => {
      return Observable.create((observer: any) => {
        observer.next(Actions.openSky.getFlightsPending());
        const {
          begin,
          end,
        } = action;
        openSkyApi
          .getFlights(begin, end)
          .then((flights: Array<OpenSkyFlight>) => {
            observer.next(Actions.openSky.getFlightsSuccess(flights));
          })
          .catch((error: any) => {
            observer.next(Actions.openSky.getFlightsFailed('Request failed'));
          });
      });
    })
  );
};
