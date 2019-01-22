import React from 'react'

const AccountDetailForm = (props) => {

    console.log(props)
  return (
    <div>
      <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" onChange={props.handleInputChange}/>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" onChange={props.handleInputChange}/>
            <label htmlFor="contactNumber">Contact:</label>
            <input type="text" id="contactNumber" onChange={props.handleInputChange}/>
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" onChange={props.handleInputChange}/>
        </form>
    </div>
  )
}

export default AccountDetailForm;