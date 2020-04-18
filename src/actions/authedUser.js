export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser (authenid) {
  return {
    type: SET_AUTHED_USER,
    authenid 
  }
}
