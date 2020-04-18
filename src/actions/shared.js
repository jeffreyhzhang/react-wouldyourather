import { getInitialData } from '../data/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'
 
export function handleInitialData () {
  return (dispatch) => {
   dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions,authenid }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        //we have login page now
        //dispatch(setAuthedUser(authenid))
        dispatch(hideLoading())
      })
  }
}