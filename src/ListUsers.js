import React, { Component } from 'react'
import axios from 'axios'
import UserCard from './UserCard'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'
// import PrintUserCards from './PrintUserCards';

class ListUsers extends Component {
  state = {};
    
  //when component mounts we send a request for the users and send through the token in the headers. with the response we set state of users to the response.
  componentDidMount() {
        const config = { headers: {token: localStorage.getItem('token')}}
        axios.get('http://localhost:5000/admin/users', config)
            .then(resp => this.setState({users: resp.data, filteredUsers: resp.data}))
            .catch(err => console.log(err));
  }

  handleSearch = (search) => {
    const { users } = this.state
    const string = search.toLowerCase()

    let filteredUsers = users.filter(user => {
        if(user.personalAttribute.firstName.toLowerCase().includes(string) || user.personalAttribute.lastName.toLowerCase().includes(string)) {
            return user
        }
    })

    if(filteredUsers.length === 0) {
        this.setState({filteredUsers: null})
    } else {
        this.setState({ filteredUsers })
    }
  }
    
  //with each user in the users array, we will render a UserCard component passing id, firstname and lastname as props. if there is no users it will render loading...
  render() {

    const {users, filteredUsers} = this.state;
    if(!users) return <h1>Loading...</h1>
    console.log(users)
    return (
        <div className="main-container">
            <div className="content-container">
            <SearchBar search={this.handleSearch}/>
                {filteredUsers &&
                filteredUsers.map(user => {
                    return (
                        <>
                            <UserCard
                            key={user._id}
                            id={user._id}
                            firstName={user.personalAttribute.firstName}
                            lastName={user.personalAttribute.lastName}
                            />
                        </>
                )})}
                <Link to="/admin/new-user">Add User</Link>
            </div>
        </div>
    )
  }
}

export default ListUsers