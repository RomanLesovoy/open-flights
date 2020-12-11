import { Login } from "../types/Auth";

const mockResponses: any = {
  user: (body: Login) => {
    if (body.login === 'Admin' && body.password === 'password') {
      return {
        id: 1,
        name: 'Admin',
        success: true,
      };
    }
    return {
      success: false,
      error: 'Credentials are invalid',
    }
  },
  logout: () => ({
    success: true,
  }),
}

export default class BaseApi {
  createRequest = async (
    body: any,
    route: string,
    method: 'post' | 'get' | 'put' = 'get',
    fakeObjName: boolean | string = false,
  ) => {
    const req = {
      method,
      body,
    };
    return new Promise<any>(async (res, rej) => {
      try {
        // TODO temp
        if (fakeObjName) {
          return setTimeout(() => {
            res(mockResponses[String(fakeObjName)](body))
          }, 1500)
        }
        const response: any = await fetch(route, req);
        let responseUnpacked: any;
        try {
          responseUnpacked = await response.json();
        } catch (e) {
          responseUnpacked = response;
        }
        return res(responseUnpacked);
      } catch (e) {
        console.error(`Request to ${route} failed: `, e);
        return rej(e);
      }
    });
  }
}