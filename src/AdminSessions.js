import React, { Component } from 'react'
import axios from 'axios';
import './css/calendar.scss'
import moment from 'moment';

import Calendar from './Calendar'

class AdminSessions extends Component {
  state = {}

  onDayClick = (e, day) => {
    const {sessions} = this.state;
    const nextSession = sessions
    const sessionTime = moment(nextSession).format("hA")
    const sessionDate = moment(nextSession).format("hA dddd, MMM DD")
    const month = e.target.parentElement.parentElement.parentElement.previousSibling.childNodes[0].childNodes[0].childNodes[0].innerHTML
    const year = e.target.parentElement.parentElement.parentElement.previousSibling.childNodes[0].childNodes[0].childNodes[2].innerHTML
    const currentDay = day
    const date = month + " " + currentDay
    this.setState({sessionTime, sessionDate, currentDay, month, year, date})  
  }
    
  componentDidMount() {
    const config = { headers: {token: localStorage.getItem('token')}}
    const { id } = this.props.match.params
    axios.get(`${process.env.REACT_APP_API_URL}/admin/sessions`, config)
    .then(resp => this.setState({sessions: resp.data.sessions}))
    .catch(err => console.log(err));
  }



  render() {
    const { sessions, date, sessionTime } = this.state;
    if(!sessions) return <h1>Loading...</h1>
    console.log(sessions)
    // const nextSession = user.sessions[user.sessions.length - 1]
    return (
      <div className="background" id="user-sessions">
        <p id="logo-type">SkyeFIT</p>
        <div className="main-container">
          <div className="content-container">
            <h1>Sessions</h1>
              <div>
                <p>Next Session:</p>
                {sessions ? <p>{sessions.map((session, i) => {
                  return(
                    <div>{i+1}: {session.time}</div>
                  )
                })}</p> : <p>no sessions coming up</p>}  
              </div>
              <div className="calendar-container">
                <Calendar width="302px"
                  onDayClick={(e, day)=> 
                  this.onDayClick(e, day)}/>
                {date ? <small>{date}: </small> : <small>no date selected</small>}
                {sessionTime ? <small>{sessionTime}</small> : <p>no sessions on this day</p>}
              </div>
          </div>
        </div>
      </div>
    )
  }  
}

export default AdminSessions;