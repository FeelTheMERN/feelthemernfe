import React, { Component } from 'react'
import axios from 'axios';
import PrintKeyValue from './PrintKeyValue';
import PrintPersonalDetails from './PrintPersonalDetails'
import PrintContactDetails from './PrintContactDetails';
import AccountDetailForm from './AccountDetailForm';
import PrintPersonalAttributes from './PrintPersonalAttributes';
import './css/userprofile.scss';
import UpdatePassword from './UpdatePassword'

class UserProfileView extends Component {
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
    const url = `${process.env.REACT_APP_API_URL}/user/users/${this.props.match.params.id}`
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
    this.props.history.push(`/admin/users/${id}/new-mealplan`)
  }
  redirectCurrentPlan = () => {
    const {id} = this.props.match.params
    this.props.history.push(`/user/users/${id}/mealplan`)
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

  updateAttr = (id, value) => {
    if(id === 'weightLog'){
      const {personalAttribute} = this.state.user
      personalAttribute[id].push(value)
      this.setState({personalAttribute})
      this.saveEdit()
    }
    const {personalAttribute} = this.state.user
    personalAttribute[id] = value 
    this.setState({personalAttribute})
    this.saveEdit()
  }

  deleteUser = (e) => {
    e.preventDefault()
    const url = `${process.env.REACT_APP_API_URL}/admin/users/delete`
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
    const url = `${process.env.REACT_APP_API_URL}/admin/users/edit`
    const data = { user }
    console.log(data)
    axios.put(url, data, config)
      .then(resp => this.setState({user: resp.data}))
      .catch(err => {
        if(!err.response) return console.log(err)
        if(err.response.status === 401) return console.log("Unauthorized")
        if(err.response.status === 403) return this.props.history.replace('/admin')
      })
  }

  setBodyFat = (bodyFat, fatMass, leanMass) => {
    const {personalAttribute} = this.state.user
    personalAttribute.bodyFatLog.push(bodyFat)
    personalAttribute.fatMass.push(fatMass)
    personalAttribute.leanMass.push(leanMass)
    this.setState({personalAttribute}, () => this.saveEdit())
  }

  toggleEditPassword = () => {
      const {editPassword} = this.state
      if(!editPassword) return this.setState({editPassword: true})
      this.setState({editPassword: false})
  }

  updatePassword = (pass) => {
    let {password} = this.state.user
    password = pass
    this.setState({password}, () => {
        // send to password backend
    })
  }

  render() {
    console.log(this.state.user)
    const { user, printTransaction, editPersonalDetailsBtn, editNotesBtn, editNotesBtnMsg, editContactDetailsBtn, contactDetailsBtnMsg, editPassword } = this.state;
    console.log(user)
    if(!user) return <h1>Loading...</h1>
    return (
      <div className="background" id="user-profile">
        <div className="user-profile">
          <div className="main-container">
            <div className="content-container">

            <div className="column">

              <div className="top-row personal-info">
                <div className="title">
                  <h1>Personal Info</h1>
                </div>
                  <img src={user.image} alt={user.personalAttribute.firstName}/>
                  { !editPersonalDetailsBtn && <PrintPersonalDetails obj={user.personalAttribute} key={user._id}/>}
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
                        contactNumber={user.contact.contactNumber}
                        edit={true}/>}
                  { editContactDetailsBtn && <button onClick={() => this.saveEdit('editContactDetailsBtn', 'contactDetailsBtnMsg')}>Save</button>}
                </div>

              <div className="directory">
                <div>
                  <button onClick={this.toggleEditPassword}>Update Password</button>
                  <button onClick={this.redirectCurrentPlan}>Current Meal Plan</button>
                </div>
                {editPassword && <UpdatePassword updatePassword={this.updatePassword}/>}
              </div>
            </div>

              <div className="column personal-att">
              <div className="title">
                  <h1>Personal Attributes</h1>
                </div>
                <PrintPersonalAttributes 
                      obj={user.personalAttribute} 
                      updateAttr={this.updateAttr}
                      setBodyFat={this.setBodyFat}
                      user={true}/>
              </div>
          
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfileView;