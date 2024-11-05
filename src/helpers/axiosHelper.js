import axios from 'axios';

export const getAuthToken = () => {
  return window.localStorage.getItem('auth_token');
}

export const isAuthenticated = () => {
  console.log(getAuthToken() !== null ? true : false)
  return getAuthToken() !== null ? true : false;
}

export const setAuthToken = (token) => {
  if(token){
    window.localStorage.setItem("auth_token", token);
  } else {
    window.localStorage.removeItem("auth_token");
  }
}


axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {
  const token = getAuthToken();
  let headers = {};
  if(token !==null && token !== "null") {
    headers = {'Authorization': `Bearer: ${token}`}
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data
  })
}
