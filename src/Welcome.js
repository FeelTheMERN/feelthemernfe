import React, { Component } from 'react'
import logo from "./assets/logo/logo.png"
import Login from './Login';

// change to functional component because we don't need to change state on this page
class Welcome extends Component {
  state = {};

  // showLogInForm() runs when the button is clicked
  showLogInForm = (e) => {
    e.preventDefault(); // this prevents the default reload
    const printLogin = <Login /> // the button sets state to the Login component
    this.setState({ printLogin }) 
  }

  render() {
    const { printLogin } = this.state // we need to access printLogin from state so it can be rendered
    return (
      <div className="spread">
        <img id="logo" src={logo} alt="SkyeFIT Logo"></img>
        { !printLogin && <div><p>Welcome to</p><h1>SkyeFIT</h1></div> }
        { !printLogin && <button onClick={this.showLogInForm}>Log In</button> }
        { printLogin && <p>{printLogin}</p> }
      </div>
    )
  }
}

export default Welcome;