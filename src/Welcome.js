import React, { Component } from 'react'
import { Link } from "react-router-dom"
import logo from "./assets/logo/logo.png"
import './css/welcome.scss';

// change to functional component because we don't need to change state on this page
class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <img id="logo" src={logo} alt="SkyeFIT Logo"></img>
          <div>
            <p>Welcome to</p>
            <h1>SkyeFIT</h1>
          </div>
        <Link className="btn" to="/login">Log In</Link>
      </div>
    )
  }
}

export default Welcome;