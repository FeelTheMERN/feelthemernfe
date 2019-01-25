import React, { Component } from 'react'
import axios from 'axios';
import Calendar from 'react-calendar'
import './css/calendar.scss'

class UserSessions extends Component {
  state = {}
    
  componentDidMount() {
    const config = { headers: {token: localStorage.getItem('token')}}
    const { id } = this.props.match.params
    axios.get(`http://localhost:5000/user/users/${id}`, config)
      .then(resp => this.setState({user: resp.data}))
      .catch(err => console.log(err));
  }

  render() {
    // const {user} = this.state;
    // if(!user) return <h1>Loading...</h1>
    return (
      <div className="spread">
        <h1>Sessions</h1>
        <Calendar 
          // onChange={this.onChange}
          // value={this.state.date}
        />
        <p>Next session: </p>
      </div>
    )
  }
}

export default UserSessions;