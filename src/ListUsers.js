import React, { Component } from 'react'
import axios from 'axios'
import UserCard from './UserCard'

class ListUsers extends Component {
  state = {}
    
  //when component mounts we send a request for the users and send through the token in the headers. with the response we set state of users to the response.
  componentDidMount() {
        const config = {
            headers: {token: localStorage.getItem('token')}
        }
        axios.get('http://localhost:5000/url', config)
            .then(resp => this.setState({users: resp.data}))
            .catch(err => console.log(err));
  }
    
  //with each user in the users array, we will render a UserCard component passing id, firstname and lastname as props. if there is no users it will render loading...
  render() {
    const {users} = this.state;
    if(!users) return <h1>Loading...</h1>
    return (
      <div>
        {
            users.map(user => {
                return (
                    <UserCard
                    key={user._id}
                    id={user._id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    />
                )
            })
        }
      </div>
    )
  }
}

export default ListUsers