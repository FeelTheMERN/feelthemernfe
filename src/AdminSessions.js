import React, { Component } from 'react'
import axios from 'axios';
import './css/calendar.scss'
import moment from 'moment';

import Calendar from './Calendar'

class AdminSessions extends Component {
  state = {}

  onDayClick = (e, dateContext) => {
    // const {user} = this.state;
    // const nextSession = user.sessions[0].date
    // const sessionTime = moment(nextSession).format("hA")
    // const sessionDate = moment(nextSession).format("hA dddd, MMM DD")
    // const month = e.target.parentElement.parentElement.parentElement.previousSibling.childNodes[0].childNodes[0].childNodes[0].innerHTML
    // const year = e.target.parentElement.parentElement.parentElement.previousSibling.childNodes[0].childNodes[0].childNodes[2].innerHTML
    // const currentDay = day
    // const date = month + " " + currentDay
    // this.setState({sessionTime, sessionDate, currentDay, month, year, date})  
    console.log(dateContext)
    const {sessions} = this.state
    const selectedSessions = sessions.filter(date => moment(date.date).isSame(dateContext))
    selectedSessions.sort(this.compareTime)
    this.setState({selectedSessions})

  }

  compareTime = (a,b) => {
    if (a.time < b.time)
      return -1;
    if (a.time > b.time)
      return 1;
    return 0;
  }

  compareDate = (a,b) => {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  }
  
  componentDidMount() {
    const config = { headers: {token: localStorage.getItem('token')}}
    axios.get(`${process.env.REACT_APP_API_URL}/admin/sessions`, config)
    .then(resp => {
      const sessions = []
      resp.data.map(user => {
        user.sessions.map(session => {
          sessions.push({date: session.date,  firstName: user.personalAttribute.firstName, lastName: user.personalAttribute.lastName, image: user.image, time: session.time, location: session.location})
        })
      })
      sessions.sort(this.compareDate)
      this.setState({sessions}, () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
        dd = '0' + dd;
        }
  }

        if (mm < 10) {
        mm = '0' + mm;
        }

        today = yyyy + '-' + mm + '-' + dd ;
        const upComingSess = this.state.sessions.filter(session => session.date > today)
        this.setState({upComingSess})
      })
    })
    .catch(err => console.log(err));
  }

  render() {
    const {sessions, selectedSessions, upComingSess } = this.state;

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
                {upComingSess && <p>{upComingSess[0].date.split('-').reverse().join('/')}</p>}
                {!upComingSess && <p>No upcoming sessions</p>}

              </div>
              <div className="calendar-container">
                <Calendar 
                  sessions={sessions}
                  width="302px"
                  onDayClick={(e, day)=> 
                  this.onDayClick(e, day)}/>
                {/* {date ? <small>{date}: </small> : <small>no date selected</small>} */}
                {/* {sessionTime ? <small>You're booked in at {sessionTime}</small> : <p>no sessions on this day</p>} */}
                <div className="card-cont">
                {!selectedSessions && <p>There are no sessions on this day!</p>}
                {selectedSessions && !selectedSessions[0] && <p>There are no sessions on this day!</p>}
                {selectedSessions &&
                  selectedSessions.map(session => {
                    return (
                      <div key={session.firstName} className="sess-card">
                        <img src={session.image}/>
                        <div>
                        <p>time: {session.time} </p>
                        <p>client: {session.firstName} {session.lastName} </p>
                        <p>location: {session.location}</p>
                        </div>
                      </div>
                    )
                  })
                }
                </div>

              </div>
          </div>
        </div>
      </div>
    )
  }  
}

export default AdminSessions;