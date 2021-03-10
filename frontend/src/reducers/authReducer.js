import { SIGN_IN, SIGN_OUT, UPDATE_PROFILE } from '../actions/types'

const INITIAL_STATE = {
  isSignedIn: sessionStorage.getItem('token') ? true : false,
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  token: sessionStorage.getItem('token') || null,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN:
      sessionStorage.setItem('token', action.payload.token)
      sessionStorage.setItem('user', JSON.stringify(action.payload.user))
      return { ...state, isSignedIn: true, user: action.payload.user, token: action.payload.token }
    case SIGN_OUT:
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      return { ...state, isSignedIn: false, user: null, token: null}
    case UPDATE_PROFILE:
      sessionStorage.setItem('user', JSON.stringify({ ...state.user, ...action.payload }))
      return { ...state, user: { ...state.user, ...action.payload }}
    default:
      return state
  }
}
