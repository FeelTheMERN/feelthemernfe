import React, { Component } from 'react'
import axios from 'axios';
import './css/calendar.scss'
import Calendar from './Calendar'

class UserSessions extends Component {
  state = {}

  onDayClick = (e, day) => {
    // check if there is a session scheduled, otherwise
    alert("no sessions on this day");
  }
    
  componentDidMount() {
    const config = { headers: {token: localStorage.getItem('token')}}
    const { id } = this.props.match.params
    axios.get(`http://localhost:5000/user/users/${id}`, config)
      .then(resp => this.setState({user: resp.data}))
      .catch(err => console.log(err));
  }

  render() {
    const {user} = this.state;
    console.log(user)
    if(!user) return <h1>Loading...</h1>
    const nextSession = user.sessions[user.sessions.length - 1]
    // console.log(this.date)
    return (
      <div className="main-container">
        <div className="content-container">
          <h1>Sessions</h1>
          <Calendar width="302px"
            onDayClick={(e, day)=> 
            this.onDayClick(e, day)}/>  
          <small>no sessions on this day</small>
          <p>Next session: </p>
          <p>{nextSession.date}</p>
          <p>{nextSession.time}</p>
          <p>{nextSession.location}</p>
        </div>
      </div>
    )
  }  
}

export default UserSessions;