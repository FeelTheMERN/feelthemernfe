import React, { Component } from 'react'
import axios from 'axios';
import './css/userhome.scss';
class UserHome extends Component {
  state = {};
    
  componentDidMount() {
    const config = { headers: {token: localStorage.getItem('token')}}
    const { id } = this.props.match.params
    axios.get(`${process.env.REACT_APP_API_URL}/user/users/${id}`, config)
      .then(resp => this.setState({user: resp.data}))
      .catch(err => {
        if(!err.response) return console.log(err)
        if(err.response.status) return this.props.history.replace('/')
      });
  }

  render() {
    const {user} = this.state;
    if(!user) return <h1>Loading...</h1>
    console.log(user)
    const nextSession = user.sessions[user.sessions.length - 1]
    return (
      <div className="background" id="user-home">
        <p id="logo-type">SkyeFIT</p>
          <div className="main-container">
            <div className="content-container">
              <h1>Welcome</h1>
              {user.image && <img src={user.image} alt={user.personalAttribute.firstName}/>}
              <h3>{user.personalAttribute.firstName}</h3>
              {nextSession && <p>Your next session is: {nextSession.date} {nextSession.time} {nextSession.location}</p>}
            </div>
          </div>
      </div>
    )
  }
}

export default UserHome;

