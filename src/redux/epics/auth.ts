import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { Login } from "../../types/Auth";

import types from "../actions/types";
import Actions from "../actions";
import { setUserSession } from "../../helpers/sessionStorage";

export const signInEpic = (action$: any, state$: any, { authApi }: any) => {
  return action$.pipe(
    ofType(types.SIGN_IN),
    switchMap((action: { user: Login }) => {
      return Observable.create((observer: any) => {
        observer.next(Actions.auth.authRequestPending());
        authApi
          .signIn(action.user)
          .then((response: { success: boolean, error: string }) => {
            if (response.success) {
              observer.next(Actions.auth.authRequestSuccess(response));
              setUserSession(response);
            } else {
              observer.next(Actions.auth.authRequestFail(response.error));
            }
          })
          .catch((error: any) => {
            observer.next(Actions.auth.authRequestFail(error));
          });
      });
    })
  );
};

export const logoutEpic = (action$: any, state$: any, { authApi }: any) => {
  return action$.pipe(
    ofType(types.LOGOUT),
    switchMap((action: { token: string }) => {
      return Observable.create((observer: any) => {
        observer.next(Actions.auth.authRequestPending());
        authApi
          .logout()
          .then((response: { success: boolean }) => {
            if (response.success) {
              observer.next(Actions.auth.logoutRequestSuccess());
              setUserSession(null);
            } else {
              observer.next(Actions.auth.authRequestFail(response));
            }
          })
          .catch((error: any) =>
            observer.next(Actions.auth.authRequestFail(error))
          );
      });
    })
  );
};
