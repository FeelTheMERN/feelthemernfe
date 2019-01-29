import React, { Component } from 'react'
import './css/navbar.scss'
import MenuDropdown from './MenuDropdown'

class Navbar extends Component {
    //Were keeping track of state so that we can render the appropriate navbar based on the user
    state = {}

    componentDidMount() {
      // when page loads, set state of token to token in local storage
      // this.setState({token: localStorage.getItem('token')})
    }

    render() {
    return (
      <div className="Navbar">
        <MenuDropdown match={this.props.match}/>
      </div>
    )
  }
}

export default Navbar;
