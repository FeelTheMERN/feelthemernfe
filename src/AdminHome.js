import React, { Component } from 'react'
import './css/adminhome.scss';
import logo from "./assets/icons/skyefit_logo.svg"


export default class AdminHome extends Component {
  render() {
    return (
      <div className="background" id="admin-home">
        <p id="logo-type">SkyeFIT</p>
          <div className="main-container">
            <div className="adminhome-container">
              <img id="logo" src={logo} alt="SkyeFIT Logo"></img>
              <div className="adminhome-container">
                <p>Welcome back</p>
                <h1>Skye</h1>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
