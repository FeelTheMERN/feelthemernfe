import React, { Component } from 'react'
import axios from 'axios';
import PrintKeyValue from './PrintKeyValue';
import PrintPersonalDetails from './PrintPersonalDetails'
import PersonalDetailForm from './PersonalDetailForm';
import ClientNotesForm from './ClientNotesForm';
import PrintContactDetails from './PrintContactDetails';
import AccountDetailForm from './AccountDetailForm';
import PrintPersonalAttributes from './PrintPersonalAttributes';
import DeleteConfirmation from './DeleteConfirmation'
import './css/userprofile.scss' 

class UserProfile extends Component {
  state = {};

  //when component mounts a get request for a single user is triggered and the user state is set to the data that comes back.
  componentDidMount(){
    // const url = `http://localhost:5000/admin/users/${this.props.match.params.id}`
    // const config = { headers: {token: localStorage.getItem('token')}}

    // axios.get(url, config)
    this.getUser()
      .then(resp => {
        this.setState({user: resp.data}, () => {
          this.setState({ 
            personalDetailsBtnMsg: 'Edit',
            editNotesBtnMsg: 'Edit Notes',
            contactDetailsBtnMsg: 'Edit'
          })
        })
      })
      .catch(err => {
        if(!err.response) return console.log(err)
        if(err.response.status === 403) this.props.history.replace('/admin')
      });
  }

  getUser = () => {
    const url = `http://localhost:5000/admin/users/${this.props.match.params.id}`
    const config = { headers: {token: localStorage.getItem('token')}}

    return axios.get(url, config)
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
    const { editPersonalDetailsBtn } = this.state
    if(!editPersonalDetailsBtn) this.setState({ editPersonalDetailsBtn: true, personalDetailsBtnMsg: 'Cancel'})
    if(editPersonalDetailsBtn) {
      this.getUser()
        .then(resp => this.setState({ user: resp.data, editPersonalDetailsBtn: false, personalDetailsBtnMsg: 'Edit'}))
        .catch(err => {
          if(err.response.status === 403) this.props.history.replace('/admin')
        });
    }
  }

  editNotes = () => {
    const { editNotesBtn } = this.state
    if(!editNotesBtn) this.setState({ editNotesBtn: true, editNotesBtnMsg: 'Cancel'})
    if(editNotesBtn) {
      this.getUser()
      .then(resp => this.setState({ user: resp.data, editNotesBtn: false, editNotesBtnMsg: 'Edit Notes'}))
      .catch(err => {
        if(err.response.status === 403) this.props.history.replace('/admin')
      });
    }
  }

  editContactDetails = () => {
    const { editContactDetailsBtn } = this.state
    if(!editContactDetailsBtn) this.setState({ editContactDetailsBtn: true, contactDetailsBtnMsg: 'Cancel'})
    if(editContactDetailsBtn) {
      this.getUser()
      .then(resp => this.setState({ user: resp.data, editContactDetailsBtn: false, contactDetailsBtnMsg: 'Edit'}))
      .catch(err => {
        if(err.response.status === 403) this.props.history.replace('/admin')
      });
    }
  }

  persAttInputChange = (e) => {
    const {value, id} = e.currentTarget;
    // console.log(this.state.user.personalAttribute[id])
    // this.setState({[id]: value})
    const {personalAttribute} = this.state.user
    personalAttribute[id] = value
    this.setState({personalAttribute})
  }

  handleInputChange = (e) => {
    const {value, id} = e.currentTarget
    if(id === 'username' || id === 'notes' || id === 'dietaryRequirements') {
      const {user} = this.state
      user[id] = value
      this.setState({user})
    } else {
      const {contact} = this.state.user
      contact[id] = value
      this.setState({contact})
    }
  }

  deleteUser = (e) => {
    e.preventDefault()
    const url = "http://localhost:5000/admin/users/delete"
    const data = {
      id: this.state.user._id
    }
    console.log(data)
    axios.delete(url, {headers: {token: localStorage.getItem('token')}, data})
      .then(resp => {
        if(resp.data.message === 'User successfully deleted') this.setState({deleteConfirm: true})
      })
      .catch(err => {
        if(!err.response) return console.log(err)
        if(err.response.status === 401) return console.log("Unauthorized")
        if(err.response.status === 403) return this.props.history.replace('/admin')
        console.log(err.response)})
  }

  saveEdit = (btn, btnmsg) => {
    const {user} = this.state
    this.setState({[btn]: false, [btnmsg]: 'Edit'})
    const config = { headers: {token: localStorage.getItem('token')}}
    const url = 'http://localhost:5000/admin/users/edit'
    const data = { user }
    axios.put(url, data, config)
      .then(resp => this.setState({user: resp.data}))
      .catch(err => {
        if(!err.response) return console.log(err)
        if(err.response.status === 401) return console.log("Unauthorized")
        if(err.response.status === 403) return this.props.history.replace('/admin')
      })
  }

  render() {
    console.log(this.state.user)
    const { user, printTransaction, editPersonalDetailsBtn, personalDetailsBtnMsg, editNotesBtn, editNotesBtnMsg, editContactDetailsBtn, contactDetailsBtnMsg, personalAttributeBtn, deleteConfirm } = this.state;

    if(!user) return <h1>Loading...</h1>
    return (
      <div className="user-profile">
        <div className="main-container">
          <div className="content-container">

            <div className="column">
              <div className="top-row personal-info">
                <div className="title">
                  <h1>Personal Info</h1>
                  <button onClick={this.editPersonalDetails}>{personalDetailsBtnMsg}</button>
                </div>
                { !editPersonalDetailsBtn && <PrintPersonalDetails obj={user.personalAttribute} key={user._id}/>}
                { editPersonalDetailsBtn && <PersonalDetailForm 
                      // firstName={user.personalAttribute.firstName}
                      firstName={user.personalAttribute.firstName}
                      lastName={user.personalAttribute.lastName}
                      dob={user.personalAttribute.dob}
                      gender={user.personalAttribute.gender}
                      handleInputChange={this.persAttInputChange}/>}
                { editPersonalDetailsBtn && <button onClick={() => this.saveEdit('editPersonalDetailsBtn', 'personalDetailsBtnMsg')}>Save</button>}
                { user.remainingSessions && <div className="box">
                  <p>Remaining Sessions: </p><p>{user.remainingSessions}</p>
                </div>}
              </div>

              <div className="top-row contact">
              <div className="title">
                <h1>Contact Details</h1>
                <button onClick={this.editContactDetails}>{contactDetailsBtnMsg}</button>
              </div>
              { !editContactDetailsBtn && <PrintContactDetails obj={user.contact}/>}
              { editContactDetailsBtn && <AccountDetailForm 
                    handleInputChange={this.handleInputChange}
                    username={user.username}
                    email={user.contact.email}
                    contactNumber={user.contact.contactNumber}/>}
              { editContactDetailsBtn && <button onClick={() => this.saveEdit('editContactDetailsBtn', 'contactDetailsBtnMsg')}>Save</button>}
              </div>

              <div className="directory">
                <div>
                <button onClick={this.showTransactions}>Transaction History</button>
                { printTransaction && <p>{printTransaction}</p>}
                <button onClick={this.redirectMealPlan}>Add Meal Plan</button>
                </div>
                <div>
                <button>Add New Booking</button>
                <button onClick={this.deleteUser}>Delete User</button>
                {deleteConfirm && <DeleteConfirmation history={this.props.history}/>}
                </div>
              </div>
            </div>

            <div className="column notes">
              <div className="title">
                <h1>Notes</h1>
                <button onClick={this.editNotes}>{editNotesBtnMsg}</button>
              </div>
              { !editNotesBtn && <>
                <div className="box note">
                  <p>Notes:</p>
                  <p>{user.notes}</p>
                </div>
                <div className="box note">
                  <p>Dietary Requirements:</p>
                  <p>{user.dietaryRequirements}</p>
                </div>
              </>}
              { editNotesBtn && <ClientNotesForm 
                    notes={user.notes} 
                    dietaryRequirements={user.dietaryRequirements}
                    handleInputChange={this.handleInputChange}/>}
              { editNotesBtn && <button onClick={() => this.saveEdit('editNotesBtn', 'editNotesBtnMsg')}>Save</button>}
            </div>

             <div className="column personal-att">
             <div className="title">
                <h1>Personal Attributes</h1>
              </div>
              <PrintPersonalAttributes obj={user.personalAttribute}/>
            </div>
        
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile;