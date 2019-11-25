export const REQUEST_USER_LIST = "REQUEST_USER_LIST";
export const RECEIVE_USER_LIST = "RECEIVE_USER_LIST";
export const RECEIVE_USER_LIST_EXCEPTION = "RECEIVE_USER_LIST_EXCEPTION";

export function getUsers() {
    return async (dispatch, getState) => {
        dispatch({type: REQUEST_USER_LIST});

        let state = getState();
        let config = {
            headers: {
                Authorization: "Bearer " + state.oidc.user.access_token,
                "Cache-Control": "no-cache"
            }
        };

        if (!state.users.users.length)
            config.headers["Cache-Control"] = "no-cache";

        fetch("api/UserManagement/Users", config)
            .then(async response => {
                const users = await response.json();
                dispatch({type: RECEIVE_USER_LIST, users});
            }).catch(ex => {
            dispatch({type: RECEIVE_USER_LIST_EXCEPTION, error: ex.message});
        });
    }
}