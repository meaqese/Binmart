import {createReducer} from "@reduxjs/toolkit";
import {setAuthInfo, setAuthStatus} from "../../action";


const initialState = {
  authInfo: {},
  isAuthorized: false
};

export const user = createReducer(initialState, (builder) => {
  builder.addCase(setAuthStatus, (state, action) => {
    state.isAuthorized = action.payload;
  });
  builder.addCase(setAuthInfo, (state, action) => {
    state.authInfo = action.payload;
  });
});


