import React, { Component } from 'react'
import { Link } from "react-router-dom"

// change to functional component because we don't need to change state on this page
class Welcome extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to SkyeFIT!</h1>
        <Link className="btn" to="/login">Log In</Link>
      </div>
    )
  }
}

export default Welcome;