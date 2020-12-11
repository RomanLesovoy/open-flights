export const userSessionKey = 'user';
export const setUserSession = (user: any) => sessionStorage.setItem(userSessionKey, JSON.stringify(user));
export const getUserSession = () => JSON.parse(String(sessionStorage.getItem(userSessionKey)));
