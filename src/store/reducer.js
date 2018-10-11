import * as actionType from './action';

const initialState = {
    limit: 3,
    open: false,
    objValue: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.OPEN_MODAL:
            return {
                ...state,
                open: true,
                objValue: action.objValue
            }
        case actionType.CLOSE_MODAL:
            return {
                ...state,
                open: false,
                objValue: null
            }
        case actionType.LOAD_MORE:
            return {
                ...state,
                limit: action.len
            }
    }
    return state;
}

export default reducer;
