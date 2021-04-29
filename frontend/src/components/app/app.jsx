import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import browserHistory from '../../browser-history';

import Main from "../main/main";
import Profile from "../profile/profile";
import Fonts from "../../fonts/fonts";

const App = () => {
  return <Router history={browserHistory}>
    <Fonts/>
    <Switch>
      <Route path="/" exact>
        <Main/>
      </Route>
      <Route path="/profile" exact>
        <Profile/>
      </Route>
    </Switch>
  </Router>
};


export default App;
