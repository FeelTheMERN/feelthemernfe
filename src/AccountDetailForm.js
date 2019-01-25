import React from 'react'

const AccountDetailForm = (props) => {
  // console.log(props)
  return (
    <div>
      <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" onChange={props.handleInputChange} value={props.username}/>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" onChange={props.handleInputChange} value={props.email}/>
            <label htmlFor="contactNumber">Contact:</label>
            <input type="text" id="contactNumber" onChange={props.handleInputChange} value={props.contactNumber}/>
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" onChange={props.handleInputChange} value={props.password}/>
        </form>
    </div>
  )
}

export default AccountDetailForm;