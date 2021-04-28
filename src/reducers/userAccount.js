import {
    CREATE_USER,
    RETRIEVE_USERS,
    RETRIEVE_TOTAL_PAGES,
    UPDATE_USER,
    DELETE_USER
} from '../actions/type';

const initialState = [];

const userAccountReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case CREATE_USER:
            return [...state, payload];
        case RETRIEVE_TOTAL_PAGES:
            return payload;
        case RETRIEVE_USERS:
            return payload;
        case UPDATE_USER:
            return state.map((state) => {
                if (state.id === payload.id) {
                  return {
                    ...state,
                    ...payload,
                  };
                } else {
                  return state;
                }
            });
        case DELETE_USER:
            return state.filter(({ id }) => id !== payload.id);
        default:
            return state;
    }
}

export default userAccountReducer;