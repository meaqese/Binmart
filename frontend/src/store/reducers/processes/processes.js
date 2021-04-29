import {createReducer} from "@reduxjs/toolkit";
import {setBoughtData, setError} from "../../action";

const initialState = {
  errors: {
    login: false,
    register: false,
    pay: false
  },
  boughtData: {}
};

export const processes = createReducer(initialState, (builder) => {
  builder.addCase(setError, (state, action) => {
    const {errorType, errorData} = action.payload;
    state.errors[errorType] = errorData;
  });
  builder.addCase(setBoughtData, (state, action) => {
    state.boughtData = action.payload;
  });
});
