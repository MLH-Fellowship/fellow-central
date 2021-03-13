import { combineReducers } from 'redux'
import authReducer from './authReducer'
import eventsReducer from './eventsReducer'
import pointsReducer from './pointsReducer'

export default combineReducers({
  auth: authReducer,
  events: eventsReducer,
  points: pointsReducer,
});
