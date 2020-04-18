import { RECEIVE_USERS,ADD_USER_QUESTION,SAVE_USER_ANSWER } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    //authedUser is the author of question id
     //actions is {id, authedUser}
    case ADD_USER_QUESTION:
      const { id, authedUser } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat(id)
        }
      };
 
   //action is {id,answer,authedUser}
    case SAVE_USER_ANSWER :
      let uid = action.authedUser;
      return {
        ...state,
        [uid]: {
          ...state[uid],
          answers: {
            ...state[uid].answers,
            [action.id]: action.answer
          }
        }
      };

    default :
      return state
  }
}