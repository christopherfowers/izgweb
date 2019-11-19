import {
    REQUEST_SPELLS,
    RECEIVE_SPELLS,
    RECEIVE_SPELLS_EXCEPTION
} from "../actions/spell";

const initialState = {
    spells: [],
    error: null,
    isLoading: false
};

export default (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case RECEIVE_SPELLS:
            return {
                ...state,
                spells: action.spells,
                error: null,
                isLoading: false
            };
        case REQUEST_SPELLS:
            return {
                ...state,
                error: null,
                isLoading: true
            };
        case RECEIVE_SPELLS_EXCEPTION:
            return {
                ...state,
                profileError: action.error,
                isLoading: false
            };
        default:
            return {
                ...state
            }
    }
};
