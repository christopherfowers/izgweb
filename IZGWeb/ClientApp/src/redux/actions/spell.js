export const REQUEST_SPELLS = "REQUEST_SPELLS";
export const RECEIVE_SPELLS = "RECEIVE_SPELLS";
export const RECEIVE_SPELLS_EXCEPTION = "RECEIVE_SPELLS_EXCEPTION";

export function getSpells() {
    return async (dispatch, getState) => {
        dispatch({ type: REQUEST_SPELLS});
        
        let state = getState();
        // debugger;
        let config = {
            headers: {
                Authorization: "Bearer " + state.oidc.user.access_token
            }
        };
        
        fetch("api/DnD/Spell/AllSpells",config)
            .then(async response => {
                const spells = await response.json();
                dispatch({type: RECEIVE_SPELLS, spells });
            }).catch(ex => {
            dispatch({type: RECEIVE_SPELLS_EXCEPTION, ex });
        });
    }
}