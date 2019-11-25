import {
    REQUEST_SPELLS,
    RECEIVE_SPELLS,
    RECEIVE_SPELLS_EXCEPTION
} from "../actions/spell";

const initialState = {
    spells: [],
    error: "",
    isLoading: false
};

export default (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case RECEIVE_SPELLS:
            return {
                ...state,
                spells: action.spells,
                error: "",
                isLoading: false
            };
        case REQUEST_SPELLS:
            return {
                ...state,
                error: "",
                isLoading: true
            };
        case RECEIVE_SPELLS_EXCEPTION:
            return {
                ...state,
                error: action.error,
                isLoading: true
            };
        default:
            return {
                ...state
            }
    }
};
