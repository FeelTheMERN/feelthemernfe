import React, { Component } from 'react'
import axios from 'axios';
import PrintKeyValue from './PrintKeyValue';
import PrintPersonalDetails from './PrintPersonalDetails'
import PersonalDetailForm from './PersonalDetailForm'

class UserProfile extends Component {
  state = {};

  //when component mounts a get request for a single user is triggered and the user state is set to the data that comes back.
  componentDidMount(){
    const url = `http://localhost:5000/admin/users/${this.props.match.params.id}`
    const config = { headers: {token: localStorage.getItem('token')}}

    axios.get(url, config)
      .then(resp => {
        this.setState({user: resp.data}, () => {
          const { user } = this.state
          this.setState({ 
            personalDetails: <PrintPersonalDetails obj={user.personalAttribute} key={user._id}/>,
            personalDetailsBtnMsg: 'Edit'
            })
        })
      })
      .catch(err => {
        if(err.status === 500) return console.error("Token expired")
        console.error(err)
      });
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

  redirectMealPlan = () => {
    const {id} = this.props.match.params
    this.props.history.push(`/admin/users/${id}/mealplan`)
  }

  editPersonalDetails = () => {
    const { user, editPersonalDetailsBtn, personalDetails, personalDetailsBtnMsg } = this.state
    console.log("in edit personal details btn")
    console.log(editPersonalDetailsBtn)

    if(!editPersonalDetailsBtn){
      this.setState({
        editPersonalDetailsBtn: true, 
        personalDetailsBtnMsg: 'Cancel',
        personalDetails: <PersonalDetailForm 
          firstName={user.personalAttribute.firstName}
          lastName={user.personalAttribute.lastName}
          dob={user.personalAttribute.dob}
          gender={user.personalAttribute.gender}/>
      })
    } 
    if(editPersonalDetailsBtn){
      console.log("in the second bit")
      this.setState({ 
        editPersonalDetailsBtn: false, 
        personalDetailsBtnMsg: 'Edit', 
        personalDetails: <PrintPersonalDetails obj={user.personalAttribute} key={user._id}/>
      })
    }
  }

  render() {
    const { user, printTransaction, personalDetails, editPersonalDetailsBtn, personalDetailsBtnMsg } = this.state;
    if(!user) return <h1>Loading...</h1>

    return (
      <>
        <h1>Personal Info</h1>
        <button onClick={this.editPersonalDetails}>{personalDetailsBtnMsg}</button>
        { !editPersonalDetailsBtn && <>{personalDetails}</>}
        { editPersonalDetailsBtn && <>{personalDetails}</>}
        { editPersonalDetailsBtn && <button>Save</button>}


        <h1>Contact Details</h1>
        <button>Edit</button>
        <PrintKeyValue obj={user.contact} key={user._id}/>
        <h1>Notes</h1>
        <button>Add to Notes</button>
        <p>{user.notes}</p>
        <h1>Remaining Sessions</h1>
        <p>{user.remainingSessions}</p>
        <button onClick={this.showTransactions}>Transaction History</button>
        { printTransaction && <p>{printTransaction}</p>}
        <button onClick={this.redirectMealPlan}>Add Meal Plan</button>
        <button>Add New Booking</button>
      </>
    )
  }
}

export default UserProfile;