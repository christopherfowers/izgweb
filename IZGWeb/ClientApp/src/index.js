import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { browserHistory } from "react-router";
import configureStore from "./redux/store";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {OidcProvider} from "redux-oidc";
import userManager from "./utils/userManager";

import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";

import './site.css'

// Create browser history to use in the Redux store
// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(browserHistory, initialState);

const rootElement = document.getElementById("root");

const onRedirectCallback = appState => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

ReactDOM.render(
    <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
    >
      <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
          <App />
        </OidcProvider>
      </Provider>
    </Auth0Provider>,
  rootElement
);

registerServiceWorker();
