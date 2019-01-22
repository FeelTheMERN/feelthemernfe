import React, { Component } from 'react'
import axios from 'axios';
import PrintKeyValue from './PrintKeyValue';

class UserProfile extends Component {
  state = {
    user: {
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
      }
  };

  //when component mounts a get request for a single user is triggered and the user state is set to the data that comes back.
  componentDidMount(){
    const url = `http://localhost:5000/admin/users/${this.props.match.params.id}`
    const config = { headers: {token: localStorage.getItem('token')}}

    axios.get(url, config)
      .then(resp => this.setState({user: resp.data}))
      .catch(err => console.log(err));
  }

  //showTransactions() runs when the button is clicked
  showTransactions = (e) => {
    e.preventDefault();//this prevents the default reload
    const { transactionalHistory } = this.state.user //we get the transactional history from the user in state
    const { transactionBtn } = this.state //we get transaction btn from state, currently undefined
    const printTransaction = transactionalHistory.map(transaction => <PrintKeyValue obj={transaction} key={transaction.date}/>)//iterate through the transactional history array and create a new array of PrintKeyValue components

    if(!transactionBtn){//we are checking if transaction is a falsy value
      return this.setState({ printTransaction, transactionBtn: true })//setting state of printTransaction and toggling the transaction Btn. setting state with triger render again.
    } 
    this.setState({printTransaction: null, transactionBtn: false})//the second click will give a truthy value for transactionbtn so this will run and set printTransaction to null and again toggles the transaction Btn. This will hide the rendered component.
  }

  render() {
    const { user, printTransaction } = this.state;
    
    if(!user) return <h1>Loading...</h1>
    return (
      <>
        <h1>Personal Info</h1>
        <PrintKeyValue obj={user.personalAttribute} key={user._id}/>
        <h1>Contact Details</h1>
        <PrintKeyValue obj={user.contact} key={user._id}/>
        <p>{user.notes}</p>
        <p>{user.remainingSessions}</p>
        <button onClick={this.showTransactions}>Sessions</button>
        { printTransaction && <p>{printTransaction}</p>}
      </>
    )
  }
}

export default UserProfile;