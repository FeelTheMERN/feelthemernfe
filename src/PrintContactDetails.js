import React from 'react'

export default function PrintContactDetails(props) {
  const { obj } = props
  return (
    <div>
      <p>Email: {obj.email}</p>
      <p>Contact Number: {obj.contactNumber}</p>
    </div>
  )
}
