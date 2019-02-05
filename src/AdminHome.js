import React, { Component } from 'react'
import './css/adminhome.scss';
import logo from "./assets/icons/skyefit_logo.svg"
import decode from 'jwt-decode'


export default class AdminHome extends Component {
  componentDidMount =() => {
    const decoded = decode(localStorage.getItem('token'));
    if(decoded.username !== 'admin') return this.props.history.replace('/admin')
  }

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
