import React from 'react'

const PersonalDetailForm = (props) => {
  return (
    <div>
      <form>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" onChange={props.handleInputChange} value={props.firstName}/>
            <label htmlFor="lastName">Surname:</label>
            <input type="text" id="lastName" onChange={props.handleInputChange} value={props.lastName}/>
            <label htmlFor="dob">Date of birth:</label>
            <input type="date" id="dob" onChange={props.handleInputChange} value={props.dob}/>
            <label htmlFor="gender">Gender:</label>
              <div>
                <input type="radio" id="gender" name="gender" value="male" onClick={props.handleInputChange}/>
                <label htmlFor="gender">Male</label><br></br>
                <input type="radio" id="gender" name="gender" value="female" onClick={props.handleInputChange}/>
                <label htmlFor="gender">Female</label>
              </div>
        </form>
    </div>
  )
}

export default PersonalDetailForm;