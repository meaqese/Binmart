import {
  addGood, clearUserGoods,
  deleteGood,
  loadGoods,
  loadTags,
  loadUserGoods,
  redirectToRoute,
  setAuthInfo,
  setAuthStatus, setBoughtData,
  setError
} from "./action";
import {convertSnakeToCamel} from "../utils";
import qs from 'qs';

export const login = (username, password) => (dispatch, _getState, api) => {
  api.post(`/login`, {username, password}).then(({data}) => {
    dispatch(setAuthStatus(true));
    dispatch(setAuthInfo(convertSnakeToCamel(data)));
    dispatch(clearUserGoods());
  }).catch(() => dispatch(setError({errorType: `login`, errorData: true})));
};

export const register = (username, password) => (dispatch, _getState, api) => {
  api.post(`/register`, {username, password}).then(({data}) => {
    dispatch(setAuthStatus(true));
    dispatch(setAuthInfo(convertSnakeToCamel(data)));
  }).catch(() => dispatch(setError({errorType: `register`, errorData: true})));
};

export const logout = () => (dispatch, _getState, api) => {
  api.get(`/logout`).then(() => {
    dispatch(setAuthStatus(false));
    dispatch(setAuthInfo({}));

    dispatch(redirectToRoute(`/`));
  }).catch(() => {});
};

export const checkAuth = () => (dispatch, _getState, api) => {
  api.get(`/login`).then(({data}) => {
    dispatch(setAuthStatus(true));
    dispatch(setAuthInfo(convertSnakeToCamel(data)));
  }).catch(() => {});
};

export const fetchGoods = (tags = []) => (dispatch, _getState, api) => {
  api.get(`/goods`, {params: {tags: tags}, paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" })})
      .then(({data}) => dispatch(loadGoods(data)))
      .catch(() => {});
};

export const fetchTags = () => (dispatch, _getState, api) => {
  api.get(`/tags`).then(({data}) => dispatch(loadTags(data))).catch(() => {});
};

export const fetchUserGoods = () => (dispatch, _getState, api) => {
  api.get(`/my-goods`).then(({data}) => dispatch(loadUserGoods(data))).catch(() => {});
};

export const deleteMyGood = (id) => (dispatch, _getState, api) => {
  api.delete(`/good/${id}`).then(({data}) => dispatch(deleteGood(data))).catch(() => {});
};

export const addNewGood = (good) => (dispatch, _getState, api) => {
  api.post(`/good`, good).then(({data}) => dispatch(addGood(data))).catch(() => {});
};

export const buyGood = (id) => (dispatch, _getState, api) => {
  api.post(`/buy/${id}`).then(({data}) => dispatch(setBoughtData({id: id, data: data.data})))
      .catch(({error}) => alert(error.reason));
};

export const checkPay = (comment, amount) => (dispatch, _getState, api) => {
  api.get(`/top-up/check-arrive/${amount}/${comment}`).then(({data}) => {
    if (data.success) {
      dispatch(setError({errorType: `pay`, errorData: true}));
    }
  }).catch(() => {});
};
