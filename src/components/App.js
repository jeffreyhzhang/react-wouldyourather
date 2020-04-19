import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Menu from './Menu'
import Login from './Login'
import Logout from './Logout'
import MyPage from './MyPage'
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import Questions from './Questions'
// import QuestionResult from './QuestionResult'
// import AnswerQuestion from "./AnswerQuestion"

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
        <BrowserRouter basename="/" >
          <Fragment>
          <LoadingBar />

                {(!this.props.authedUser) ?
                    <Login/>
                :
                  <Fragment>
                  <Menu />
                  <Switch>
                      <Route path='/' exact component={MyPage} />
                      <Route path='/leaderboard' exact component={LeaderBoard} />
                      {/* <Route path='/questions/:id' exact component={QuestionResult} />
                      <Route path='/answerquestion/:id' exact component={AnswerQuestion} /> */}
                      <Route path='/questions/:id' exact component={Questions} />
                      <Route path='/add' exact component={NewQuestion} />
                      <Route path='/logout' exact component={Logout} />
                  </Switch>
                  </Fragment>
                }
          </Fragment>
        </BrowserRouter>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default  connect(mapStateToProps)(App) 
