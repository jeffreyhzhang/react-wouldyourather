import React, { Component } from 'react'
import { connect } from 'react-redux'
import { //Redirect ,
    withRouter} from 'react-router-dom' 
import { setAuthedUser } from '../actions/authedUser'
 
 
class Logout extends Component {

    componentDidMount()
    {
        this.props.dispatch(setAuthedUser(null));
        //wait for user to be null...then push
       //return <Redirect to='/' />;
         //push is relative to current url...not the root???
        this.props.history.push('/')
    }
    render() {
     
      return ( <div>Never displayed</div> )
    }
}
  
export default withRouter(connect()(Logout))
 