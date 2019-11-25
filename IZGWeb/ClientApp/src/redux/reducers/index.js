import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as oidcReducer } from 'redux-oidc';

import account from "./account";
import users from "./users";
import spells from "./spell"

const reducers = {
  oidc: oidcReducer,
  spells,
  users,
  account
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
