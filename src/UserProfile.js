import React, { Component } from 'react'
import axios from 'axios';
import PrintKeyValue from './PrintKeyValue';
import PrintPersonalDetails from './PrintPersonalDetails'
import PersonalDetailForm from './PersonalDetailForm';
import ClientNotesForm from './ClientNotesForm';
import PrintContactDetails from './PrintContactDetails';
import AccountDetailForm from './AccountDetailForm';
import PrintPersonalAttributes from './PrintPersonalAttributes';
import ClientAttributeForm from './ClientAttributeForm'

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
            personalDetailsBtnMsg: 'Edit',
            notes: <p>{user.notes}</p>,
            editNotesBtnMsg: 'Edit Notes',
            contactDetails: <PrintContactDetails obj={user.contact}/>,
            contactDetailsBtnMsg: 'Edit',
            personalAttributesBtnMsg: 'Edit',
            personalAttributes: <PrintPersonalAttributes obj={user.personalAttribute}/>
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
    const { user, editPersonalDetailsBtn } = this.state
    console.log("in edit personal details btn")

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
      this.setState({ 
        editPersonalDetailsBtn: false, 
        personalDetailsBtnMsg: 'Edit', 
        personalDetails: <PrintPersonalDetails obj={user.personalAttribute} key={user._id}/>
      })
    }
  }

  editNotes = () => {
    const { user, editNotesBtn } = this.state
    if(!editNotesBtn){
      this.setState({
        editNotesBtn: true,
        editNotesBtnMsg: 'Cancel',
        notes: <ClientNotesForm notes={user.notes} />
      })
    }
    if(editNotesBtn) {
      this.setState({
        editNotesBtn: false,
        editNotesBtnMsg: 'Edit Notes',
        notes: <p>{user.notes}</p>
      })
    }
  }

  editContactDetails = () => {
    const { editContactDetailsBtn, user} = this.state
    if(!editContactDetailsBtn){
      this.setState({
        editContactDetailsBtn: true,
        contactDetailsBtnMsg: 'Cancel',
        contactDetails: <AccountDetailForm 
          email={user.contact.email}
          contactNumber={user.contact.contactNumber}/>
      })
    }
    if(editContactDetailsBtn) {
      this.setState({
        editContactDetailsBtn: false,
        contactDetailsBtnMsg: 'Edit',
        contactDetails: <PrintContactDetails obj={user.contact}/>
      })
    }
  }

  editPersonalAttributes = () => {
    const { personalAttributeBtn, user} = this.state
    const { personalAttribute} = this.state.user
    console.log(personalAttribute.weightLog[personalAttribute.weightLog.length - 1])
    if(!personalAttributeBtn){
      this.setState({
        personalAttributeBtn: true,
        personalAttributesBtnMsg: 'Cancel',
        personalAttributes: <ClientAttributeForm 
          height={personalAttribute.height}
          weight={personalAttribute.weightLog[personalAttribute.weightLog.length - 1]}
          bodyFat={personalAttribute.bodyFatLog[personalAttribute.bodyFatLog.length - 1]}
          // fatMass={}
          // leanMass={}
          goalWeight={personalAttribute.goalWeight}
          goalBodyFat={personalAttribute.goalBodyFat}
          />
      })
    }
    if(personalAttributeBtn){
      this.setState({
        personalAttributeBtn: false,
        personalAttributesBtnMsg: 'Edit',
        personalAttributes: <PrintPersonalAttributes obj={this.user.personalAttribute}/>
      })
    }
  }

  render() {
    const { user, printTransaction, personalDetails, editPersonalDetailsBtn, personalDetailsBtnMsg, editNotesBtn, notes, editNotesBtnMsg, editContactDetailsBtn, contactDetails, contactDetailsBtnMsg, personalAttributesBtnMsg, personalAttributeBtn, personalAttributes } = this.state;
    if(!user) return <h1>Loading...</h1>
console.log(contactDetails)
    return (
      <div className="main-container">
        <div className="content-container">
          <h1>Personal Info</h1>
          <button onClick={this.editPersonalDetails}>{personalDetailsBtnMsg}</button>
          { !editPersonalDetailsBtn && <>{personalDetails}</>}
          { editPersonalDetailsBtn && <>{personalDetails}</>}
          { editPersonalDetailsBtn && <button>Save</button>}

          <h1>Personal Attributes</h1>
          <button onClick={this.editPersonalAttributes}>{personalAttributesBtnMsg}</button>
          { !personalAttributeBtn && <>{personalAttributes}</>}
          { personalAttributeBtn && <>{personalAttributes}</>}
          { personalAttributeBtn && <button>Save</button>}

          <h1>Contact Details</h1>
          <button onClick={this.editContactDetails}>{contactDetailsBtnMsg}</button>
          { !editContactDetailsBtn && <>{contactDetails}</>}
          { editContactDetailsBtn && <>{contactDetails}</>}
          { editContactDetailsBtn && <button>Save</button>}

          <h1>Notes</h1>
          <button onClick={this.editNotes}>{editNotesBtnMsg}</button>
          { !editNotesBtn && <>{notes}</>}
          { editNotesBtn && <>{notes}</>}
          { editNotesBtn && <button>Save</button>}

          <h1>Remaining Sessions</h1>
          <p>{user.remainingSessions}</p>
          <button onClick={this.showTransactions}>Transaction History</button>
          { printTransaction && <p>{printTransaction}</p>}
          <button onClick={this.redirectMealPlan}>Add Meal Plan</button>
          <button>Add New Booking</button>
        </div>
      </div>
    )
  }
}

export default UserProfile;