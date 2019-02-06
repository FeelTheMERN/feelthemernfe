import React, { Component } from 'react'
import './css/adminhome.scss';
import profilePic from "./assets/img/Skye.png"
import decode from 'jwt-decode'


export default class AdminHome extends Component {
  componentDidMount =() => {
    const decoded = decode(localStorage.getItem('token'));
    if(decoded.username !== 'admin') return this.props.history.replace('/admin')
  }

  render() {
    // const nextSession = user.sessions[user.sessions.length - 1]
    return (
      <div className="background" id="admin-home">
        <p id="logo-type">SkyeFIT</p>
          <div className="main-container">
            <div className="adminhome-container">
              <h1>Welcome</h1>
                <img src={profilePic} alt="Skye"/>
              <div className="adminhome-container">
                <h3>Skye</h3>
                {/* {nextSession && <p>Your next session is: <br/> {nextSession.date} {nextSession.time} {nextSession.location}</p>} */}
              </div>
            </div>
          </div>
      </div>
    )
  }
}
