import React, { Component } from 'react';
import menuIcon from "./assets/icons/MenuIcon.svg"
// import yellowMenuIcon from "./assets/icons/MenuIcon_yellow.svg"
import mealIcon from "./assets/icons/good-diet-svgrepo-com.svg"
import exerciseIcon from "./assets/icons/exercise-svgrepo-com.svg"
import progressIcon from "./assets/icons/graphic-progression-svgrepo-com.svg"
import './css/navbar.scss';
import {Link} from "react-router-dom"
class MenuDropdown extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });   
    }
  }

  render() {
    return (
      <div>
        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <Link to="/" className="menu-item">Home</Link>
                <img id="menu-icon" src={mealIcon} alt="Meal Plan Icon"></img>
                <Link to="/user/users/:id/mealplan" className="menu-item">Meal Plan</Link>
                <img id="menu-icon" src={mealIcon} alt="Meal Plan Icon"></img>
                <Link to="/user/users/:id/sessions" className="menu-item">Sessions</Link>
                <img id="menu-icon" src={exerciseIcon} alt="Sessions Icon"></img>
                <p className="menu-item">Progress</p>
                <img id="menu-icon" src={progressIcon} alt="Progress Icon"></img>
              </div>
            )
            : (
              null
            )
        }
        {/* <div id="nav-icon" onClick={this.showMenu} alt="SkyeFIT Logo"></div> */}
        <img id="menu-icon" src={menuIcon} onClick={this.showMenu} alt="SkyeFIT Logo"></img>
      </div>
    );
  }
}

export default MenuDropdown;
