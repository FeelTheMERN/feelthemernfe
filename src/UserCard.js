import React from 'react'
import { Link } from 'react-router-dom';

//UserCard will return and image and the users first name and last name which links to the user profile page when clicked on
const UserCard = (props) => {
  const url = `/admin/users/${props.id}`
  console.log(props.image)
  return (
    <div className="user-card" key={props.id}>
      <img src={props.image} alt={props.firstName}/>
      <Link className="text" to={url}>{props.firstName} {props.lastName}</Link>
    </div>
  )
}

export default UserCard;