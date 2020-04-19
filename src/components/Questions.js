import React, { Component  } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Alert, ProgressBar, Badge, Card, Image, Col, Row , Container, ListGroup ,Button   } from 'react-bootstrap';
import roundNbr from '../utils/roundNbr'
import AnswerQuestion from './AnswerQuestion'
import _ from 'lodash';

class Questions extends Component {

  //go home
  goHome = () => {
    this.props.history.push('/');
  };


  render() {
    const { authedUser,users,question } = this.props
    //for specifc question...
 
    // if not login
    if(!authedUser){
     this.props.history.push("/")
    }

    //Wrong question ID
    if (!question) {
      //redirect to  404P age ?
      return (
           <div className='tweet'> 
            <h1 style={{color: 'dark'}}> 404 Error </h1>
            <Container>
            <Alert  variant='danger'>
                This question you requested doesn't exist!  <br></br>
                Use Navigation Menu to see what questions are available.
            </Alert>
            </Container>
        </div>
      )
    }

    const id = question.id
    //if not votes...I need vote ...redirect to vote
    let myvote = users[authedUser].answers[id]
    if(!myvote) {
      return  <AnswerQuestion id={id}/>
    }
 

    let { name , avatarURL } = _.find(users, { 'id': question.author }) 
    let opt1 = question.optionOne.votes.length
    let opt2 = question.optionTwo.votes.length
    let totalVotes = opt1 + opt2
    let opt1percent = roundNbr(opt1*100.00/totalVotes,2)
    let opt2percent = roundNbr(opt2*100.00/totalVotes,2)
 
    return (
        <Container>
         <Row>
          <Col xs={3} >
           <div variant="info" className="center"
             style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin:"0",
              height: "100%"
              }}
           >
              <Image 
                src={ avatarURL}    //src={require(`${avatarURL}`)}  // if relative place under ../image/xx.jpg
                alt={`Avatar of ${name}`}
                className='avatar'
              />
            </div>
          </Col>
          <Col xs={9}>
            <Row> <h4>Poll Stats (question by {name}):</h4> </Row>
            <Row>
              <Card style={{ width: '28rem' }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                    {myvote==='optionOne' && (<Badge variant="light"><span className="glyphicon  glyphicon-ok"  style={{fontSize:'14px', color:'red'}} aria-hidden="true"> Your Vote</span> </Badge>)}
                    <p>
                      Would you rather {question.optionOne.text}?
                    </p>
                    <ProgressBar  variant="success"  striped  now={opt1percent}  label={`${opt1percent}%`} />
                  <div className="center"> <h3>{opt1} out of {totalVotes}</h3></div>
                </ListGroup.Item>
                <ListGroup.Item>
                    {myvote==='optionTwo' && (<Badge variant="light"><span className="glyphicon  glyphicon-ok" style={{fontSize:'14px', color:'red'}} aria-hidden="true"> Your Vote</span></Badge>)}
                    <p>
                        Would you rather {question.optionTwo.text}?
                    </p>
                    <ProgressBar  variant="success"  striped  now={opt2percent}  label={`${opt2percent}%`} />
                    <div className="center"> <h3>{opt2} out of {totalVotes}</h3></div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
           </Row>
          </Col>
         </Row>
         <Row>
           <Col xs={3}></Col>
           <Col xs={9}><Button variant="success" size="sm" onClick={this.goHome}>Back</Button></Col>
         </Row>
       </Container>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, props) {
  //from query param
  const { id } = props.match.params
  const question = questions[id]
  return {
    authedUser,
    users,
    question: question
  }
}
 
 export default withRouter(connect(mapStateToProps)(Questions))
 