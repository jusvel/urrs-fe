import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const getAuthToken = () => {
  return window.localStorage.getItem('auth_token');
}

export const getUserRole = () => {
  const decoded = jwtDecode(getAuthToken());
  return decoded?.role;
}

export const isAuthenticated = () => {
  return getAuthToken() !== null ? true : false;
}

export const setAuthToken = (token: string) => {
  if(token){
    window.localStorage.setItem("auth_token", token);
  } else {
    window.localStorage.removeItem("auth_token");
  }
}


axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method: string, url: string, data: object) => {
  const token = getAuthToken();
  let headers = {};
  if(token !==null && token !== "null") {
    headers = {'Authorization': `Bearer ${token}`}
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data
  })
}
