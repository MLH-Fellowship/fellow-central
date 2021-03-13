import { 
  SIGN_IN, 
  SIGN_OUT, 
  UPDATE_PROFILE,

  SET_EVENTS,
  CLAIM_EVENT_POINTS,

  SET_POINTS,
  CREATE_POINT,
} from './types'

// Auth
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

// Events
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

// Points
export const setPoints = (points) => {
  return {
    type: SET_POINTS,
    payload: points
  }
}

export const createPoint = (point) => {
  return {
    type: CREATE_POINT,
    payload: point
  }
}
