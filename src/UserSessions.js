import React, { Component } from 'react'
import axios from 'axios';
import Calendar from 'react-calendar'
import './css/calendar.scss'

class UserSessions extends Component {
  state = {
    date: null,
  }
    
  componentDidMount() {
    const config = { headers: {token: localStorage.getItem('token')}}
    const { id } = this.props.match.params
    axios.get(`http://localhost:5000/user/users/${id}`, config)
      .then(resp => this.setState({user: resp.data}))
      .catch(err => console.log(err));
  }

  // onChange = date => this.setState({ date })

  cal = (e) => {
    // this.setState({date: value})
    // console.log(e)
    console.log(e.target)
    // alert('New date is: ', value)
  }

  render() {
    const {user} = this.state;
    if(!user) return <h1>Loading...</h1>
    // console.log(this.date)
    return (
      <div className="spread">
        <h1>Sessions</h1>
        <div onClick={this.cal} >
          <Calendar />
        </div>
        <small>no sessions on this day</small>
        <p>Next session: </p>
      </div>
    )
  }
}

export default UserSessions;