import React, { Component } from 'react'
import './css/navbar.scss'
import MenuDropdown from './MenuDropdown'

class Navbar extends Component {
    //Were keeping track of state so that we can render the appropriate navbar based on the user
    state = {}

    componentDidMount() {
      // when page loads, set state of token to token in local storage
      this.setState({token: localStorage.getItem('token')})
    }

    render() { 
    // if no token is available, navbar won't render. I.e if no user is logged in, don't display navbar yet
      
    const {token} = this.state
    if(!token) return null;
    if (window.location.pathname === '/') return null
    if (window.location.pathname === '/admin') return null
    return (
      <div className="Navbar">
        <MenuDropdown />
      </div>
    )
  }
}

export default Navbar;
