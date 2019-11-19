import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as oidcReducer } from 'redux-oidc';

import account from "./account";
import spells from "./spell"

const reducers = {
  oidc: oidcReducer,
  spells,
  account
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
