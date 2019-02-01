import React from 'react'
import { Link } from 'react-router-dom';

//UserCard will return and image and the users first name and last name which links to the user profile page when clicked on
const UserCard = (props) => {
  const url = `/admin/users/${props.id}`
  return (
    <div className="content-container" key={props.id}>
      {/* <img/> */}
      <Link to={url}>{props.firstName} {props.lastName}</Link>
    </div>
  )
}

export default UserCard;