import {createAction} from "@reduxjs/toolkit";

export const ActionType = {
  SET_AUTH_STATUS: `user/setAuthStatus`,
  SET_AUTH_INFO: `user/setAuthInfo`,
  LOAD_GOODS: `data/loadGoods`,
  LOAD_USER_GOODS: `data/loadUserGoods`,
  CLEAR_USER_GOODS: `data/clearUserGoods`,
  LOAD_TAGS: `data/loadTags`,
  ADD_GOOD: `data/addGood`,
  DELETE_GOOD: `data/deleteGood`,
  SET_ERROR: `processes/setError`,
  REDIRECT_TO_ROUTE: `processes/redirectToRoute`,
  SET_BOUGHT_DATA: `processes/setBoughtData`
};


export const setAuthStatus = createAction(ActionType.SET_AUTH_STATUS, (status) => ({payload: status}));

export const setAuthInfo = createAction(ActionType.SET_AUTH_INFO, (info) => ({payload: info}));

export const loadGoods = createAction(ActionType.LOAD_GOODS, (goods) => ({payload: goods}));

export const loadTags = createAction(ActionType.LOAD_TAGS, (tags) => ({payload: tags}));

export const loadUserGoods = createAction(ActionType.LOAD_USER_GOODS, (goods) => ({payload: goods}));

export const clearUserGoods = createAction(ActionType.CLEAR_USER_GOODS);

export const addGood = createAction(ActionType.ADD_GOOD, (good) => ({payload: good}));

export const deleteGood = createAction(ActionType.DELETE_GOOD, (good) => ({payload: good}));

export const setError = createAction(ActionType.SET_ERROR, (error) => ({payload: error}));

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (route) => ({payload: route}));

export const setBoughtData = createAction(ActionType.SET_BOUGHT_DATA, (data) => ({payload: data}));
