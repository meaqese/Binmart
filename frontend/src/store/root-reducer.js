import {combineReducers} from "redux";
import {user} from "./reducers/user/user";
import {data} from "./reducers/data/data";
import {processes} from "./reducers/processes/processes";

const NameSpace = {
  USER: `USER`,
  DATA: `DATA`,
  PROCESSES: `PROCESSES`
};

export default combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.DATA]: data,
  [NameSpace.PROCESSES]: processes
});
