import axios from "axios";

const BACKEND_URL = 'http://127.0.0.1:8000'
const TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
  CLIENT_ERROR: 400
};


export const createAPI = (onUnauthorized, onNetworkError) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onFail = (error) => {
    const {response} = error;

    if (!error.status) {
      onNetworkError();
    } else if (response.status === HttpCode.UNAUTHORIZED || response.status === HttpCode.CLIENT_ERROR) {
      onUnauthorized();
    }
    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
}

