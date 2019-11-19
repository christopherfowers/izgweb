export const REQUEST_PROFILE = "REQUEST_PROFILE";
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";
export const RECEIVE_PROFILE_EXCEPTION = "RECEIVE_PROFILE_EXCEPTION";

export const RECEIVE_TOKENS = "RECEIVE_TOKENS";
export const RECEIVE_FAILED_LOGIN = "RECEIVE_FAILED_LOGIN";

export const LOGOUT = "LOGOUT";

export function getProfile() {
    return async (dispatch, getState) => {
        dispatch({ type: REQUEST_PROFILE});
        
        let state = getState();
        let config = {
            headers: {
                Authorization: "Bearer " + state.account.tokens.accessToken
            }
        };
        
        fetch("api/Account/GetAccount", config)
            .then(async response => {
                const profile = await response.json();
                dispatch({type: RECEIVE_PROFILE, profile });
            }).catch(ex => {
                debugger;
                dispatch({type: RECEIVE_PROFILE_EXCEPTION, ex });
            });
    }
}

export function receiveTokens(tokens) {
    return (dispatch, getState) => {
        dispatch({ type: RECEIVE_TOKENS, tokens: tokens });
    }
};

export function receiveAuthenticationFailure(error) {
    return (dispatch, getState) => {
        dispatch({type: RECEIVE_FAILED_LOGIN, error})
    }
}

export function clearTokens() {
    return (dispatch, getState) => {
        dispatch({type: LOGOUT});
    }    
}