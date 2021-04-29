import browserHistory from '../../browser-history';
import {ActionType} from "../action";


export const redirect = (_state) => (next) => (action) => {
  if (action.type === ActionType.REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  next(action);
};

