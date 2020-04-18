export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

//authenUser create a new question: question: id, authedUser
export function addUserQuestion (info) {
  const id  = info.id
  const  authedUser = info.author
  return {
    type: ADD_USER_QUESTION,
    id,
    authedUser
  }
}

//authenid answered a question id  with answer (either optionOne or optionTwo):{id, answer,authedUser}
export function saveUserAnswer({id, answer,authedUser}) {
  return {
    type: SAVE_USER_ANSWER,
    id,
    answer,
    authedUser
  }
}
