import React, { Component } from 'react'
import logo from "./assets/icons/skyefit_logo.svg"
import Login from './Login'
import LoginSlider from './LoginSlider'

// change to functional component because we don't need to change state on this page
class Welcome extends Component {
  state = {
    btnText: "Show Features"
  };

  // showLogInForm() runs when the button is clicked
  showLogInForm = (e) => {
    e.preventDefault(); // this prevents the default reload
    const printLogin = <Login /> // the button sets state to the Login component
    this.setState({ printLogin }) 
  }

  showLoginSlider = (e) => {
    const { featuresBtn } = this.state
    e.preventDefault()
    const printSlider = <LoginSlider />
    // this.setState({ printSlider }) 

    if(!featuresBtn){
      return this.setState({ printSlider, featuresBtn: true, btnText: "Hide Features" }) //setting state of printSlider and toggling the features Btn. setting state will triger render again.
    } 
    this.setState({printSlider: null, featuresBtn: false, btnText: "Show Features"}) //the second click will give a truthy value for featuresBtn so this will run and set printSlider to null and again toggles the features Btn. This will hide the rendered component.
  }

  render() {
    const { printLogin, btnText } = this.state // we need to access printLogin from state so it can be rendered
    const { printSlider } = this.state
    console.log(btnText);
    return (
      <div className="spread">
        { !printSlider && <img id="logo" src={logo} alt="SkyeFIT Logo"></img>}
        { printLogin && printSlider && <img id="logo" src={logo} alt="SkyeFIT Logo"></img>}
        { !printLogin && !printSlider && <div><p>Welcome to</p><h1 className="yellow">SkyeFIT</h1></div> }
        { printSlider && !printLogin && <>{printSlider}</>}
        { !printLogin && <button className="small" onClick={this.showLoginSlider}>{btnText}</button> }
        { !printLogin && <button onClick={this.showLogInForm}>Log In</button> }
        { printLogin && <p>{printLogin}</p> }
      </div>
    )
  }
}

export default Welcome;