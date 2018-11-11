import { combineReducers } from 'redux'
import { createStore } from 'redux'
import changeUser from './Reducers/userReducer'
import changeCalendar from './Reducers/calendarReducer'

let rootReducer = combineReducers({ userReducer: changeUser, calendarReducer: changeCalendar })

//Création du store avec nos reducers
export default createStore(rootReducer);