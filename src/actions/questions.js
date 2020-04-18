import { saveQuestionAnswer, saveQuestion } from '../data/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addUserQuestion, saveUserAnswer} from './users' 
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESION'
export const ANSWER_QUESTION = 'ANSWER_QUESION'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

//pass OptionOneText:text1, OptionTwoText: text2, author:userid
function answerQuestion (question) {
  return {
    type: ANSWER_QUESTION,
    question,
  }
}

//which answer picked  for questionid, answer is either 'OptionOne' or 'OptionTwo'
// info: id, answer,authedUser ==>question: id, answer,authedUser
export function handleAnswerQuestion (info) {
   //need make sure answer is either 'OptionOne' or 'OptionTwo'
  return (dispatch, getState) => {
     dispatch(showLoading())
      return saveQuestionAnswer(info)       //this updates API/DB, but not store
      .then((question) => { 
          dispatch(answerQuestion(question))
          dispatch(saveUserAnswer(info))    //need update user's answers
        })   //this call reducer,  update the store so to update rendering
      .then(() => dispatch(hideLoading()))
  }
}
// question ===>optionOneText, optionTwoText
export function handleAddQuestion (optionOneText, optionTwoText) {
 console.log("!!!!handleAddQuestion")
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())  //wait for DB/API 
      return saveQuestion({
        optionOneText,
        optionTwoText,
        author: authedUser
      }).then((question) =>{          //then store
          dispatch(addQuestion(question))
          dispatch(addUserQuestion(question))  //need add user's questions array
        })
       .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}
 
 