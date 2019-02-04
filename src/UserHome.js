import React, { Component } from 'react'
import axios from 'axios';
import './css/userhome.scss';
class UserHome extends Component {
  state = {};
    
  componentDidMount() {
    const config = { headers: {token: localStorage.getItem('token')}}
    const { id } = this.props.match.params
    axios.get(`http://localhost:5000/user/users/${id}`, config)
      .then(resp => this.setState({user: resp.data}))
      .catch(err => console.log(err));
  }

  render() {
    const {user} = this.state;
    if(!user) return <h1>Loading...</h1>
    // console.log(user)
    return (
      <div className="background" id="user-home">
        <p id="logo-type">SkyeFIT</p>
          <div className="main-container">
            <div className="content-container">
              <h1>Welcome</h1>
              <h3>{user.username}</h3>
              <p>Your next session is: </p>
            </div>
          </div>
      </div>
    )
  }
}

export default UserHome;

