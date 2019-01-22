import React from 'react'

const PersonalDetailForm = (props) => {

  return (
    <div>
      <form>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" onChange={props.handleInputChange}/>
            <label htmlFor="lastName">Surname:</label>
            <input type="text" id="lastName" onChange={props.handleInputChange}/>
            <label htmlFor="dob">Date of birth:</label>
            <input type="text" id="dob" onChange={props.handleInputChange}/>
            <label htmlFor="gender">Gender:</label>
            <input type="text" id="gender" onChange={props.handleInputChange}/>
        </form>
    </div>
  )
}

export default PersonalDetailForm;