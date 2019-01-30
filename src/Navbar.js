import React, { Component } from 'react'
import './css/navbar.scss'
import MenuDropdown from './MenuDropdown'

class Navbar extends Component {
    //Were keeping track of state so that we can render the appropriate navbar based on the user
    state = {}

    render() {
      console.log("rendering navbar")
    return (
      <div className="Navbar">
        <MenuDropdown match={this.props.match}/>
      </div>
    )
  }
}

export default Navbar;
