const TOKEN_KEY = 'auth_token';

export const authenticate = token => localStorage.setItem(TOKEN_KEY, token);
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const deauthenticate = () => localStorage.removeItem(TOKEN_KEY);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
