const initialState = { calendars: undefined };

/**
 * reducer to manage calendars
 * can add user's calendars when he was connected
 * @param state
 * @param action
 * @returns state with calendars
 */
function changeCalendar(state = initialState, action) {
    let nextState = state;
    switch (action.type) {
        case 'GET_CALENDARS':
            nextState.calendars = action.value;
            return nextState || state;
        case 'ADD_CALENDAR':
            nextState = {
                ...state,
                calendars: [...state.calendars, action.value]
            };
            return nextState || state;
        case 'UNSET_CALENDARS':
            nextState.calendars = action.value;
            return nextState || state;
        default:
            return state;
    }
}

export default changeCalendar