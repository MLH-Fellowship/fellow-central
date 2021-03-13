import { SET_POINTS, CREATE_POINT } from '../actions/types'

export default function pointsReducer (state = [], action) {
  switch(action.type) {
    case SET_POINTS:
      return [...action.payload]
    case CREATE_POINT:
      return [...state, action.payload]
    default:
      return state
  }
}
