import { SIGN_IN, SIGN_OUT, UPDATE_PROFILE } from './types'

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

