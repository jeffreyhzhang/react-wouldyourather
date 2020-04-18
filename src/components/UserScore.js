import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';
import { Image, Col, Row , Container, ProgressBar  } from 'react-bootstrap';
import CircledNumber  from './CircledNumber';

// this is used by leaderboard...
class UserScore extends Component {
 
  render() {
 
    const {users, who} = this.props
    const {answerct,questionct, totalct,ranking } = who

    let { name , avatarURL } =  _.find(users, { 'id': who.id })  // usr // _.find(users, { 'id': id }) 
    let medalImgSrc ='/images/ok.png'
  
    switch(ranking) {
      case 0:
        medalImgSrc='/images/gold.jpg'
        break;
      case 1:
        medalImgSrc='/images/silver.jpg'
        break;
      case 2:
        medalImgSrc ='/images/bronze.jpg'
        break;
      default:
    }

    return (
      <Fragment>
      <Row>
        <Col xs={4}>
            <div
             style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               margin:"0",
               height: "100%"
               }}
             >
             <Image 
                  src={medalImgSrc}     
                  alt={`Ranked {1+${ranking}}`}    
                  className='avatar'
             />  
             <Image 
                        src={avatarURL}    //require(`${avatarURL}`
                        alt={`Avatar of ${name}`}
                        className='avatar'
                      />  
           </div>
         </Col>
         <Col >
            <Container>
              <Row><Col xs={10}><h3>{name}</h3></Col></Row>
              <Row><Col xs={5}><h6>Answered Questions</h6></Col><Col xs={2}> <h4>{answerct} </h4></Col>
                   <Col xs={3}><CircledNumber Number={totalct} /> </Col>       
              </Row>
              <Row><Col xs={5}><h6>Created Questions</h6></Col><Col xs={2}> <h4>{questionct}</h4> </Col>
              </Row>
            </Container>
         </Col>
      </Row>
      <Row>
        <Col>
        <ProgressBar striped variant="success" now={100} />
        </Col>
      </Row>
      </Fragment>
    )
  }
}
//passing ranking data
function mapStateToProps ({users},{who}) {
  return {
    users,
    who: who
  }
}
 
export default connect(mapStateToProps)(UserScore)
 