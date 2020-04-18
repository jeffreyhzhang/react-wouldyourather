import { connect } from 'react-redux'
import { NavLink,withRouter } from 'react-router-dom'
import React, { Component } from 'react'
 
class Menu extends Component {

  handlesubmit = (e) => {
    e.preventDefault()
    this.props.history.push('/logout')
  }
  render(){ 
    const {loginname,avatarURL}  = this.props 
    return (
      <div >
       <nav className='nav' >    
        
          <ul className="navbar-nav mr-auto">
            <li>
              <NavLink to='/' exact activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/add' activeClassName='active'>
                New Question
              </NavLink>
            </li>
            <li>
              <NavLink to='/leaderboard' exact activeClassName='active'>
                Leader Board
              </NavLink>
            </li>
          </ul>
           <form className="form-inline" onSubmit={this.handlesubmit}>
            <span className="mr-sm-2" style={{color:"blue"}}>  Hi, {loginname}  </span>
            {/* <img
              src={avatarURL}
              className="avatar align-top"
              alt={loginname}
            /> */}
            <button className="btn  btn-sm my-2 my-sm-0" type="submit" >Logout</button>
           </form>

        </nav> 
      </div> 
    )
  }
}
 
function mapStateToProps ({authedUser,users} ) {
   //undefined initially as authedUser=''
    let loginname=''
    let avatarURL=''
    if(authedUser)
    {
       loginname =users[authedUser].name
       avatarURL = users[authedUser].avatarURL
    }
 
    return {
      loginname,
      avatarURL
    }
  }
  
export default withRouter(connect(mapStateToProps)(Menu))
 