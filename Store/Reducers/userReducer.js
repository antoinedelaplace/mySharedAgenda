const initialState = { user: undefined };

/**
 * reducer to manage user
 * can add a user when he was connected
 * @param state
 * @param action
 * @returns state with user
 */
function changeUser(state = initialState, action) {
    let nextState = state;
    switch (action.type) {
        case 'ADD_USER':
            nextState.user = action.value;
            return nextState || state;
        case 'REMOVE_USER':
            nextState.user = action.value;
            return nextState || state;
        default:
            return state;
    }
}

export default changeUser