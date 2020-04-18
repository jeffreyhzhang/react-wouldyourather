import React, { Component } from 'react'
import { connect } from 'react-redux'
import BaseElement from './BaseElement'
import { Alert,Tabs, Tab  } from 'react-bootstrap';
import propTypes from 'prop-types'
import _ from 'lodash';
 
class MyPage extends Component {

  state ={
    activeTabKey: null
  }

   setKey = (k) =>{
    this.setState({activeTabKey:k})
   }

  render() {
    const { authedUser, questions, users } = this.props
    if(!authedUser) {
        return null
    }

    //order by timestamp, so we see the newer question at top??
    let answeredquestions = users[authedUser].answers 
    let unasweredquestion = _.filter(questions, (q) => _.indexOf( Object.keys(answeredquestions), q.id) === -1 )
                      .sort((a,b)=> b.timestamp - a.timestamp);
    //if no unanswered question  make answered question tab active tab.
    let activeTabKey=  unasweredquestion.length >0 ? "UQ" :"AQ"
     //this will allow user to tab it... otherwise we never get to tab with no questions.
     if(this.state.activeTabKey) activeTabKey= this.state.activeTabKey
   //we want to set the key when click
    return (
      <Tabs defaultActiveKey={activeTabKey}  activeKey={activeTabKey} id="MyPage"  onSelect={(k) => this.setKey(k)} >
            <Tab eventKey="UQ" title="Unanswered">
                {unasweredquestion.length>0 &&
                  unasweredquestion.map(q =>   
                    <div key={q.id}>
                      <BaseElement  unanswered = {true} id = {q.id}/>
                    </div>
                  )}
                  {unasweredquestion.length<1 &&
                  <Alert variant="success">
                      <Alert.Heading> Greate job!</Alert.Heading>
                      <hr />
                      <p className="mb-0">
                       No poll left un-voted.
                      </p>
                    </Alert>
                  }
            </Tab>
            <Tab eventKey="AQ" title="Answered">
                {Object.keys(answeredquestions).map( (q)=> 
                    <div key={q}>
                      <BaseElement unanswered = {false}  id = {q} />
                    </div>
                )}
                {Object.keys(answeredquestions).length<1 &&
                  <Alert variant="success">
                      <Alert.Heading> Sorry </Alert.Heading>
                      <hr />
                      <p className="mb-0">
                         No voted polls yet.
                      </p>
                    </Alert>
                  }
            </Tab>
      </Tabs>     
    )
  }
}

function mapStateToProps ({ authedUser, questions, users } ) {
  return {
    authedUser,
    questions,
    users 
  }
}
 
MyPage.propTypes = {
  authedUser:propTypes.string.isRequired,
  questions:propTypes.object.isRequired,
  users:propTypes.object.isRequired
}
export default connect(mapStateToProps)(MyPage)