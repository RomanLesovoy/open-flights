import types from "../actions/types";
import { getUserSession } from "../../helpers/sessionStorage";
import { Status } from "../../types/Base";

const initialState = {
  status: !getUserSession() ? Status.None : Status.Success,
  error: "",
  user: getUserSession(),
};

interface State {
  status: Status,
  error: string,
  user: any,
}

interface Action {
  error: string,
  user: any,
  type: string,
}

interface SelectorsState { auth: State }

export const authReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case types.AUTH_REQUEST_FAIL: {
      return { ...state, error: action.error, user: null, status: Status.Failed }
    }
    case types.AUTH_REQUEST_PENDING: {
      return { ...state, status: Status.Pending, error: '' }
    }
    case types.AUTH_REQUEST_SUCCESS: {
      return { ...state, status: Status.Success, user: action.user, error: '' }
    }
    case types.LOGOUT_REQUEST_SUCCESS: {
      return { ...state, status: Status.None, user: null, error: '' }
    }

    default:
      return state;
  }
};

export const selectUser = (state: SelectorsState) => state.auth.user;
export const selectAuthStatus = (state: SelectorsState) => state.auth.status;
export const selectAuthError = (state: SelectorsState) => state.auth.error;
