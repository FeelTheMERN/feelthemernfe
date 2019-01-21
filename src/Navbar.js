import React, { Component } from 'react'
import './css/navbar.scss';

class Navbar extends Component {
    //Were keeping track of state so that we can render the appropriate navbar based on the user
    state = {
      
    }

    render() { 
    return (
      <div className="Navbar">
          <p>Home</p>
          <p>Calendar</p>
      </div>
    )
  }
}

export default Navbar;
