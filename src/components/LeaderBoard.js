import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container ,ProgressBar  } from 'react-bootstrap';
import UserScore from './UserScore'
import propTypes from 'prop-types'


class Leaderboard extends Component {

  render() {
    const { users } = this.props
   // total score in descending order...rank them
   //if score the same...we need rank them...if all 3 got the same score, all ranked 1  
    const arr =  Object.keys(users).map( (id)=> users[id] ).map( (id)=>  
          ({ 
          id: id.id,  
          answerct:  Object.keys(id.answers).length  , 
          questionct: id.questions.length, 
          totalct: Object.keys(id.answers).length + id.questions.length })
    )
    const sortedarr = arr.sort((a,b)=> b.totalct-a.totalct)
    let rankarr = arr.map( (x,index)=> sortedarr[index].totalct)
    let rank = rankarr.map( (v)=> rankarr.indexOf(v)); // zero based ranking
    let zz = sortedarr.map((x,index) => (
        {...x, ranking: rank[index]})
    )
   
   return (
     <Container>
       <h1 className="center">Leader Score Board</h1>
       <ProgressBar striped variant="success" now={100} />
       {  zz.map( (usr,index) => 
           <UserScore  key={index}  who={usr}></UserScore>
        )}
     </Container>
   )
  }
}

function mapStateToProps ({users}) {
  return {
    users
  }
}
Leaderboard.propTypes = {
  users:propTypes.object.isRequired
}
export default connect(mapStateToProps)(Leaderboard)
 