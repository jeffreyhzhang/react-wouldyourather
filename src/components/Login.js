import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../logo.svg';
import { setAuthedUser } from '../actions/authedUser'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom' 
 
class Login extends Component {
    
    //set User...  why after set autheuser...it nav to home 
    state = {
        pickedUser: '' 
    }
    isDisabled = () => {
        return  this.state.pickedUser ==='';
     };

    setUser = (e) => {
        e.preventDefault()
        this.setState({pickedUser:e.target.value })
    }
 
    handlelogin = (e) => {
        e.preventDefault()
        this.props.dispatch(setAuthedUser(this.state.pickedUser))
        //after sucess login...got to home page???
    }

    render() {
      //why cannot set to Pick a User as default??
       const { users, authedUser} = this.props
       if(authedUser) {
            return <Redirect to='/' />;  //this is the relative or what the current url is??
       }
        return (
            <div>
                <form className='new-tweet'  onSubmit={this.handlelogin}>
                    <div className='center'>
                        <h1 align="center"> Welcome to Would You Rather App!</h1>
                        <h5 align="center"> Please sign in to continue</h5>
                    </div>
                    <img src={logo} className="login-logo" alt="logo" />
                    <div className='center'>
                        <select value ={this.props.pickedUser} onChange={this.setUser}>
                        <option value='' key='x' disabled={(authedUser)}> Pick A User </option>
                        {users.map((usr) => (
                            <option value={usr.id} key={usr.id} > {usr.name} </option>
                        ))}
                        </select>
                    </div>
                    <Button variant="success"  //className='btn'   
                            type='submit'
                            disabled={this.isDisabled()}>
                        Sign in
                    </Button>
                </form>
            </div>
        )
    }
}
//order by user name in dropdown..
function mapStateToProps ({users,authedUser} ) {
    return {
      users: Object.keys(users).sort((a,b) => a>b ? 1 : -1 ).map((id)=>  users[id]) ,
      authedUser
    }
  }
  
export default connect(mapStateToProps)(Login)
 