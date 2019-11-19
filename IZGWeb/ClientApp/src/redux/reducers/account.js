import {
    RECEIVE_TOKENS, 
    RECEIVE_FAILED_LOGIN, 
    REQUEST_PROFILE, 
    RECEIVE_PROFILE, 
    RECEIVE_PROFILE_EXCEPTION,
    LOGOUT
} from "../actions/account";

const initialState = {
    tokens: {},
    profile: {},
    loginError: {},
    profileError: {},
    isAuthenticated: false,
    isLoading: false
};

export default (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case RECEIVE_TOKENS:
            return {
                ...state,
                tokens: action.tokens,
                loginError: {},
                isAuthenticated: true,
                isLoading: false
            };
        case RECEIVE_FAILED_LOGIN:
            return {
                ...state,
                loginError: action.error,
                isAuthenticated: false,
                isLoading: false
            };
        case REQUEST_PROFILE:
            return {
                ...state,
                profileError: {},
                isLoading: true
            };
        case RECEIVE_PROFILE:
            return {
                ...state,
                profile: action.profile,
                profileError: {},
                isLoading: false
            };
        case RECEIVE_PROFILE_EXCEPTION:
            return {
                ...state,
                profileError: action.error,
                isLoading: false
            };
        case LOGOUT:
            return {
                ...state,
                tokens: {},
                profile: {},
                loginError: {},
                profileError: {},
                isAuthenticated: false,
                isLoading: false
            };
        default: 
            return {
                ...state
            }
    }
};
