import thunk from "redux-thunk";
import {routerMiddleware} from "react-router-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {loadUser} from "redux-oidc";

import rootReducer from "../reducers";
import userManager from "../../utils/userManager";

export default function configureStore (history, initialState) {
    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }
    
    let store =  createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
    
    loadUser(store, userManager);
    
    return store;
}