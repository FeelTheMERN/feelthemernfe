import React, { Component } from 'react'
import homeIcon from "./assets/icons/home.svg"
import mealIcon from "./assets/icons/mealplan.svg"
import exerciseIcon from "./assets/icons/sessions.svg"
import progressIcon from "./assets/icons/progress.svg"
import {Link} from "react-router-dom"
import './css/navbar.scss'

class UserMenu extends Component {
  constructor() {
    super()
    
    this.state = {
      showMenu: false,
    }
    
    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }
  
  showMenu(event) {
    event.preventDefault()
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }
  
  closeMenu(event) { 
    if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu)
      })   
    }
  }

  deleteToken = () => {
    // when user clicks log-out, delete token
    localStorage.removeItem("token")
    // then redirect them back to log-in page
    this.props.history.replace('/')
  }

  render() {
    console.log(this.state.showMenu)
    const { id } = this.props.match.params
    const sessionsLink = `/user/users/${id}/sessions`
    const mealPlanLink = `/user/users/${id}/mealplan`
    return (
      <div>
        {
          this.state.showMenu
            ? (
              <div
                className="menu-window"
                ref={(element) => {
                  this.dropdownMenu = element
                }}
              >
                <div className="menu-content">
                  <Link to="/" className="menu-item">Home</Link>
                  <img id="menu-icon" src={homeIcon} alt="Meal Plan Icon"></img>
                  <Link to={mealPlanLink} className="menu-item">Meal Plan</Link>
                  <img id="menu-icon" src={mealIcon} alt="Meal Plan Icon"></img>
                  <Link to={sessionsLink} className="menu-item">Sessions</Link>
                  <img id="menu-icon" src={exerciseIcon} alt="Sessions Icon"></img>
                  <Link to={sessionsLink} className="menu-item">Progress</Link>
                  <img id="menu-icon" src={progressIcon} alt="Progress Icon"></img>
                  <p className="menu-item" onClick={this.deleteToken} alt="Log Out">Log Out</p>
                </div>
              </div>
            )
            : (
              null
            )
        }
        {/* <div id="nav-icon" onClick={this.showMenu} alt="SkyeFIT Logo"></div> */}
        <p id="nav-text" onClick={this.showMenu} alt="Menu">MENU</p>
      </div>
    )
  }
}

export default UserMenu
