import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions'
import { Button, Card,CardGroup, Badge, Image, Col, Row , Container } from 'react-bootstrap';
import propTypes from 'prop-types'
 

class AnswerQuestion extends Component {
  
  state = {
    selectedOption: '',
    toResultPage: false,
  };

  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  handlesubmit = (e) => {
    e.preventDefault()
    const { dispatch, authedUser , id} = this.props
    let answer  =this.state.selectedOption

    dispatch(handleAnswerQuestion({
        id: id,
        answer:answer,
        authedUser
      })
    )
    this.setState({toResultPage: true});
  }

  render() {
    const { questions,authedUser,users,id} = this.props
    
    if(!authedUser){
      this.props.history.push("/")
    }

    if (!questions[id]) {
      return<div className='tweet'> <h1 style={{color: 'red'}}>This question doesn't exist!</h1></div>
    }
    //after answered the question..
    if(this.state.toResultPage){ 
      return <Redirect to={`/questions/${id}`} />;
   }
    //just show optionone text with ...?
    const {author} = questions[id]
    const {avatarURL, name} = users[author] 
 
    return (
        <CardGroup>
            <Card className="text-center col-sm-3">
              <Card.Header>Question Author</Card.Header>
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Image variant="top" src={avatarURL} className="avatar"/>    
              </Card.Body>
              <Card.Footer className="text-muted">{users[authedUser].name} has not voted yet</Card.Footer>
            </Card>
            <Card className="text-center col-sm-6">
              <Card.Header as="h3">Would You Rather ...</Card.Header>
              <Card.Body>
              <form onSubmit={this.handlesubmit}>
              <Container>
                <Row>
                  <Col xs={4} md={4}><input type="radio" 
                        value="optionOne" 
                        checked={this.state.selectedOption === "optionOne"}
                        onChange={this.handleOptionChange} /></Col>
                  <Col className="left col-sm-8"> {questions[id].optionOne.text}? </Col>
                </Row>
                <Row>
                  <Col xs={4} md={4}> <input type="radio" 
                        value="optionTwo" 
                        checked={this.state.selectedOption === "optionTwo"}
                        onChange={this.handleOptionChange} /></Col>
                  <Col className="left col-sm-8">{questions[id].optionTwo.text}? </Col>
                </Row>
              </Container>
               <Button variant="success"  type='submit' disabled = {this.state.selectedOption ===''?true:false}>
                   Submit
               </Button>
             </form>   
              </Card.Body>
              <Card.Footer className="text-muted">Tap <Badge variant="info"> Submit </Badge> to vote</Card.Footer>
            </Card>
        </CardGroup>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, props) {
  const { id } = props.match.params
  return {
    authedUser,
    users,
    questions,
    id:id
  }
}
 
AnswerQuestion.propTypes = {
  authedUser:propTypes.string.isRequired,
  questions:propTypes.object.isRequired,
  users:propTypes.object.isRequired,
  id:propTypes.string.isRequired,
}
 export default withRouter(connect(mapStateToProps)(AnswerQuestion))
 