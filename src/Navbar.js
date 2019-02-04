import React, { Component } from 'react'
import './css/navbar.scss'
import UserMenu from './UserMenu'
import AdminMenu from './AdminMenu'

class Navbar extends Component {
    //Were keeping track of state so that we can render the appropriate navbar based on the user
    state = {};

    render() {
      console.log('rendering navbar')
    const user = window.location.pathname.split('/')[1]
    if(user === 'admin'){
      return (
      // give the component access to history through props
      <div className="Navbar">
        <AdminMenu history={this.props.history}/>
      </div>
      )
    }
    if(user === 'user'){
      return (
        <div className="Navbar">
          <UserMenu history={this.props.history} match={this.props.match}/>
        </div>
      )
    }
  }
}

export default Navbar;
