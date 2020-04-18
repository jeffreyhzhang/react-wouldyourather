import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Badge,Button,Card, CardGroup, Image} from 'react-bootstrap';
 
class BaseElement extends Component {
   
  handleQuestion = (e, id, unanswered) => {
    e.preventDefault()
    if(unanswered)
      this.props.history.push(`/answerquestion/${id}`)
    else
      this.props.history.push(`/questions/${id}`)
  }

  render() {
    const { question, authedUser, users, unanswered } = this.props
 
   // if not login yet
    if(!authedUser){
      this.props.history.push("/")
    }
    if (question === null) {
      return<div className='tweet'> <h1 style={{color: 'red'}}>This question doesn't exist!</h1></div>
    }
 
    const { avatarURL ,name} = users[question.author]
    const actionText = (unanswered) ? "Take Your Vote": "View Polls"
    
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
              <Card.Title>{question.optionOne.text}?</Card.Title>
              <Card.Text>
                or ...
              </Card.Text>
              <Button variant="success"  onClick={(e) => this.handleQuestion(e, question.id,unanswered )}>
                 {actionText}
              </Button>  
            </Card.Body>
            <Card.Footer className="text-muted">Tap <Badge variant="info"> {actionText} </Badge> to vote</Card.Footer>
          </Card>
      </CardGroup>
    )
  }
}

function mapStateToProps ({authedUser, users, questions},  {id, unanswered}) {
  const question = questions[id]
  return {
    authedUser,
    users,
    question: question,
    unanswered
  }
}
 
export default withRouter(connect(mapStateToProps)(BaseElement))
 