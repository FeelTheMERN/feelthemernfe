import React, { Component } from 'react'

class Navbar extends Component {
    //Were keeping track of state so that we can render the appropriate navbar based on the user
    state = {
      
    }

    render() { 
    return (
      <div>
          <h1>Home</h1>
          <h1>Calendar</h1>
      </div>
    )
  }
}

export default Navbar;
