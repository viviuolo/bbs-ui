import axios from 'axios'
import cookie from './cookie'
import { TokenKey } from './constants'

// Add a request interceptor
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  const token = cookie.get(TokenKey);
  if (token) {
    config.headers.Authorization = `${token}`;
    // Add content type
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
  // Do something with response data
  return response;
}, (error) => {
  // Do something with response error, status code not in 2XX
  if (error.response) {
    if (error.response.status === 401) {
      // Handle auth failed
      //store.commit('setLogout');
      //cookie.delete(TokenKey);
      // Render to login page
      //router.push({ name: 'login' });
      error.message = 'Auth failed, please login.';
    } else {
      error.message = error.response.data;
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    error.message = error.request;
  }
  return Promise.reject(error);
});
export default axios