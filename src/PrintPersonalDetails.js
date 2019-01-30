import React from 'react'

export default function PrintPersonalDetails(props) {
    const {obj} = props
    return (
      <div className="persDetails">
        <p>Client Name: {obj.firstName} {obj.lastName}</p>
        <p>Date of Birth: {obj.dob}</p>
        <p>Gender: {obj.gender}</p>
      </div>
    )
}


