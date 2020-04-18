import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom' 
import { Button, Container, Alert  } from 'react-bootstrap';
 
class NewQuestion extends Component {
  state = {
    optionOneText: '' ,
    optionTwoText: '' ,
    toHome: false,
    showAlert: false
  }
  handleText1Change = (e) => {
    const optionOneText = e.target.value
    this.setState(() => ({
      optionOneText,
      showAlert:  optionOneText.toLowerCase() ===   this.state.optionTwoText.toLowerCase()
    }))
  }

  handleText2Change = (e) => {
    const optionTwoText = e.target.value
    this.setState(() => ({
      optionTwoText,
      showAlert: this.state.optionOneText.toLowerCase() ===   optionTwoText.toLowerCase()
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch  } = this.props
    const {optionOneText, optionTwoText} = this.state
 
   if(optionOneText.toLowerCase() ===  optionTwoText.toLowerCase()){
     this.setState(() => ({showAlert: true}))
     return false;
   }
    
   new Promise((res, rej) => {
      dispatch(handleAddQuestion(optionOneText, optionTwoText));
      //this wait is needed..otherwise  Home is refreshed 3 times as ADD_Question and ADD_USER_QUestion will trigger state chaneg as well
      //so this will trigger Home refresh 3 times....since React bundel dispatch in group... we wait for 1 sec. to avoid these refreshes.
      setTimeout(() => res('success'), 1200);
    }).then(() => {
            //reset question text and go home once new question created
            this.setState(() => ({
              optionOneText: '' ,
              optionTwoText: '' ,
              toHome: true,
            }))})
  }
  render() {
    const { authedUser } = this.props
    if(!authedUser)
    {
      return <Redirect to='/Login' />
    }

    const { optionOneText,optionTwoText,toHome,showAlert } = this.state
   
    if (toHome === true) {
      return <Redirect to='/' />
    }
 
    return (
      <Container>
        <h2 className='center'>Create Your Question</h2>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <input id="option1" placeholder="Enter option one of your question..." required value={optionOneText}  onChange={this.handleText1Change} type="text">
          </input>
          <h3 className='center'> OR </h3>
           <input id="option2" placeholder="Enter Option 2 of your question..." required value={optionTwoText}  onChange={this.handleText2Change} type="text">
           </input>

           <Button variant="success"  type='submit' disabled={ optionOneText === '' || optionTwoText === '' || optionOneText === optionTwoText } >
           Submit
          </Button>
          {showAlert===true  &&
           <Alert variant='danger'>
              option one and option two can NOT be the same!
           </Alert>
          }
        </form>
      </Container>
    )
  }
}

//if new question created, we want this page refreshQ
function mapStateToProps ({authedUser}) {
  return {
    authedUser 
  }
}
export default connect(mapStateToProps)(NewQuestion)