import React, { Component } from 'react'

export default class UpdatePassword extends Component {

  state ={}

  handleInputChange = (e) => {
      const {id, value} = e.currentTarget
      this.setState({[id]: value})
  }

  handleSubmit = (e) => {
      e.preventDefault()
      const {password, confirmPassword} = this.state
      console.log(password, confirmPassword)
      if(password !== confirmPassword) return this.setState({error: 'Password does not match'})
      this.props.updatePassword(password)
  }

  render() {
    return (
      <form>
        <label htmlFor="password">New password:</label>
        <input type="password" id="password" onChange={this.handleInputChange}/>

        <label htmlFor="confirmPassword">Re-enter password:</label>
        { this.state.error && <p>{this.state.error}</p>}
        <input type="password" id="confirmPassword" onChange={this.handleInputChange}/>

        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}
