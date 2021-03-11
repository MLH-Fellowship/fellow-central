import { 
  SIGN_IN, 
  SIGN_OUT, 
  UPDATE_PROFILE,

  SET_EVENTS,
  CLAIM_EVENT_POINTS,
} from './types'

export const signIn = ({ user, token }) => {
  return {
    type: SIGN_IN,
    payload: { user, token }
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const updateProfile = (user) => {
  return {
    type: UPDATE_PROFILE,
    payload: user
  }
}

export const setEvents = (events) => {
  return {
    type: SET_EVENTS,
    payload: events
  }
}

export const claimEventPoints = (id) => {
  return {
    type: CLAIM_EVENT_POINTS,
    payload: id
  }
}
