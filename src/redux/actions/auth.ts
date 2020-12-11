import types from "./types";
import { Login } from "../../types/Auth";

export default {
  signIn: (user: Login) => ({
    type: types.SIGN_IN,
    user
  }),
  logout: () => ({
    type: types.LOGOUT
  }),
  logoutRequestSuccess: () => ({
    type: types.LOGOUT_REQUEST_SUCCESS
  }),
  authRequestPending: () => ({
    type: types.AUTH_REQUEST_PENDING
  }),
  authRequestSuccess: (user: any) => ({
    type: types.AUTH_REQUEST_SUCCESS,
    user,
  }),
  authRequestFail: (error: any) => ({
    type: types.AUTH_REQUEST_FAIL,
    error,
  }),
};
