import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }

    case ANSWER_QUESTION :

      let qid = action.question.id
      let myanswer = action.question.answer
      let autheuser = action.question.authedUser

      // state[qid]  = 
      //   (myanswer === 'optionOne')? {
      //     ...state[qid],
      //         optionOne:   {
      //         ...state[qid][myanswer],
      //             votes: [ 
      //               ...state[qid].optionOne.votes.concat(autheuser)
      //             ]
      //       }
      //   }:{
      //     ...state[qid],
      //       optionTwo: {
      //       ...state[qid][myanswer],
      //         votes: [ 
      //           ...state[qid].optionTwo.votes.concat(autheuser)
      //         ]
      //   }
      // }
 
      state[qid]  = 
         {
          ...state[qid],
            [myanswer]: {
              ...state[qid][myanswer],
                  votes: [ 
                    ...state[qid][myanswer].votes.concat(autheuser)
                  ]
            }
        } 

      //just change vote for this question...so redenering...
      return {
        ...state,
         qid: state[qid]
      }
     
    case ADD_QUESTION :
      const { question } = action
      return {
        ...state,
        [action.question.id]: question,
      }
    default :
      return state
  }
}