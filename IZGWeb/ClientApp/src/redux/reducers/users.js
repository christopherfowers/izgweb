import {
    REQUEST_USER_LIST,
    RECEIVE_USER_LIST,
    RECEIVE_USER_LIST_EXCEPTION
} from "../actions/users";

const initialState = {
    users: [],
    error: "",
    isLoading: false,
    lastCompleted: 0
};

export default (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case REQUEST_USER_LIST:
            return {
                ...state,
                error: "",
                isLoading: true,
                lastCompleted: Date.now()
            };
        case RECEIVE_USER_LIST:
            return {
                ...state,
                users: action.users,
                error: "",
                isLoading: false,
                lastCompleted: Date.now()
            };
        case RECEIVE_USER_LIST_EXCEPTION:
            return {
                ...state,
                error: action.error,
                isLoading: false,
                lastCompleted: Date.now()
            };
        default:
            return {
                ...state
            }
    }
};
