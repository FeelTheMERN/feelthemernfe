import React, { Component } from 'react'
import axios from 'axios'
import UserCard from './UserCard'
import { Link } from 'react-router-dom'
// import PrintUserCards from './PrintUserCards';

class ListUsers extends Component {
  state = {
    users: [{
        _id: "1",
        username: "johnsmith",
        password: "password",
        contact: {
            email: "johnsmith@gmail.com",
            contactNumber: "0412 345 678"
        },
        personalAttribute: {
            firstName: "John",
            lastName: "Smith",
            dob: "01.01.1990",
            gender: "Male",
            height: 172,
            weightLog: [92, 85],
            goalWeight: 70,
            bodyFatLog: [20, 17],
            goalBodyFat: 10,
            goal: "Lose weight"
        },
        notes: "Low blood pressure",
        transactionalHistory: [
            {
                date: "01.21.2019",
                amountReceived: 200,
                pricePerSession: 50,
                totalSessions: 4
            }
        ],
        remainingSessions: 3,
        sessions: [
            {
                date: "01.22.2019",
                time: "22:00",
                location: "Moorabin"
            }
        ],
        dietaryRequirements: ["Vegetarian"],
        mealPlans: [
            {
                day1: [
                    [{qty: "5", foodItem: "Mushrooms"},{qty: "2", foodItem: "Tomatoes"} ],
                    [{qty: "10", foodItem: "Beans"},{qty: "50", foodItem: "Tofus"} ]
                ],
                day2: [
                    [{qty: "5", foodItem: "Apples"},{qty: "4", foodItem: "Pumpkins"} ],
                    [{qty: "2", foodItem: "Bananas"},{qty: "1", foodItem: "Bread"} ]
                ]
            }
        ]
        }]
  };
    
  //when component mounts we send a request for the users and send through the token in the headers. with the response we set state of users to the response.
  componentDidMount() {
        const config = { headers: {token: localStorage.getItem('token')}}
        axios.get('http://localhost:5000/url', config)
            .then(resp => this.setState({users: resp.data}))
            .catch(err => console.log(err));
  }
    
  //with each user in the users array, we will render a UserCard component passing id, firstname and lastname as props. if there is no users it will render loading...
  render() {
    const {users} = this.state;
    if(!users) return <h1>Loading...</h1>
    console.log(users)
    return users.map(user => {
        return (
            <>
                <UserCard
                key={user._id}
                id={user._id}
                firstName={user.personalAttribute.firstName}
                lastName={user.personalAttribute.lastName}
                />
                <Link to="admin/new-user">Add User</Link>
            </>
        )
    })
  }
}

export default ListUsers