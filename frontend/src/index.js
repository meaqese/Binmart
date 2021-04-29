import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from './store/root-reducer';
import {createAPI} from "./services/api";

import {ChakraProvider} from "@chakra-ui/react";
import theme from "./theme";

import App from "./components/app/app";
import {setAuthStatus} from "./store/action";
import {checkAuth, fetchUserGoods} from "./store/api-actions";
import {redirect} from "./store/middlewares/redirect";

const api = createAPI(() => store.dispatch(setAuthStatus(false)), () => console.log('Network error'));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
});

store.dispatch(checkAuth());
//
// setInterval(() => store.dispatch(checkAuth()), 10000);
// setInterval(() => store.dispatch(fetchUserGoods()), 60000);

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById('root')
);
