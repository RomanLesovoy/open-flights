import BaseApi from "./BaseApi";
import { Login } from "../types/Auth";

export default class AuthApi extends BaseApi {
  signIn = async (user: Login) => this.createRequest(user, "login", "post", 'user');
  logout = async () => this.createRequest(null, "logout", "get", 'logout');
}
