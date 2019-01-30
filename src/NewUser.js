import React, { Component } from 'react'
import axios from 'axios'
import AccountDetailForm from './AccountDetailForm'
import PersonalDetailForm from './PersonalDetailForm';
import ClientAttributeForm from './ClientAttributeForm';
import ClientNotesForm from './ClientNotesForm'

class NewUser extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        contactNumber: '',
        handleInputChange: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        bodyFat: '',
        height: '',
        weight: '',
        bodyFat: '',
        fatMass: '',
        leanMass: '',
        goalWeight: '',
        goalBodyFat: '',
        notes: ''
    };

    //componentDidMount() renders the first form when the page loads. It passes the component handle input change so that state is set on this page.
    componentDidMount() {
        const title = "Client Account Details"
        const formPage = 1
        this.setState({ title, formPage })
    }
    
    //handleInputChange keeps track of the imput fields by setting state of username and password
    handleInputChange = (e) => {
        const {value, id} = e.currentTarget;
        this.setState({[id]: value})
    }

    //redirect() to the user page when the user has been submitted
    redirect = (id) => {
        this.props.history.replace(`/admin/users/${id}`)
    }

    //setBodyFat() is a function passed to ClientAttributeForm so that we can set state of bodyFat on this component
    setBodyFat = (value1, value2, value3) => {
        this.setState({bodyFat: value1, fatMass: value2, leanMass: value3})
    }

    //submitForm() sends the username and password using axios. we should recieve a token which is then stored on local storage. once complete it runs the redirect funtion.
    submitForm = (e) => {
        e.preventDefault();
        const { username, password, email, contactNumber, firstName, lastName, dob, gender, height, weight, bodyFat, fatMass, leanMass, goalWeight, goalBodyFat, notes  } = this.state
        const url = 'http://localhost:5000/admin/users/new';
        const config = { headers: {token: localStorage.getItem('token')}}
        const data = { 
            user: {
                username, 
                password,
                contact: {email, contactNumber},
                personalAttribute: { firstName, lastName, dob, gender, height, weightLog:[weight], bodyFatLog:[bodyFat], fatMass:[fatMass], leanMass:[leanMass], goalWeight, goalBodyFat},
                notes
            }
         }
        axios.post(url, data, config)//structure the data correctly before sending
            .then(resp => {
                const {_id} = resp.data
                this.redirect(_id)
            })
            .catch(err => console.log(err.response))
    }

    //this funtion runs when the next button is clicked. it will check what page the form is currently on and will render the next component and update the page number.
    nextForm = (e) => {
        e.preventDefault();
        const { formPage } = this.state;
        
        if(formPage === 1) {
            const title = "Client Personal Details"
            const newformPage = formPage + 1
            this.setState({ title, formPage: newformPage }) 
        }
        if(formPage === 2) {
            const title = "Client Attributes"
            const newformPage = formPage + 1
            this.setState({ title, formPage: newformPage }) 
        }
        if(formPage === 3) {
            const title = "Client Notes"
            const newformPage = formPage + 1
            this.setState({ title, formPage: newformPage }) 
        }
    }

    //this funtion runs when the back button is clicked. it will check what page the form is currently on and will render the previous component and update the page number acordingly  .
    backForm = (e) => {
        e.preventDefault();
        const { formPage } = this.state;
    
        if(formPage === 2){
            const title = "Client Account Details"
            const newformPage = formPage - 1
            this.setState({ title, formPage: newformPage })
        }
        if(formPage === 3){
            const title = "Client Personal Details"
            const newformPage = formPage - 1
            this.setState({ title, formPage: newformPage })
        }
        if(formPage === 4) {
            const title = "Client Attributes"
            const newformPage = formPage - 1
            this.setState({ title, formPage: newformPage }) 
        }
    }

    render() {
        console.log(this.state.setBodyFat)
        const { title, formPage } = this.state
        return (
            <div className="main-container">
            <div className="content-container">
                { title && <h1>{title}</h1> }
                { formPage === 1 && <AccountDetailForm 
                        handleInputChange={this.handleInputChange} 
                        username={this.state.username} 
                        email={this.state.email}
                        password={this.state.password}
                        contactNumber={this.state.contactNumber}/> }
                { formPage === 2 && <PersonalDetailForm 
                        handleInputChange={this.handleInputChange}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        dob={this.state.dob}
                        gender={this.state.gender}/>} 
                { formPage === 3 && <ClientAttributeForm 
                        handleInputChange={this.handleInputChange}  
                        setBodyFat={this.setBodyFat}
                        height={this.state.height}
                        weight={this.state.weight}
                        bodyFat={this.state.bodyFat}
                        fatMass={this.state.fatMass}
                        leanMass={this.state.leanMass}
                        goalWeight={this.state.goalWeight}
                        goalBodyFat={this.state.goalBodyFat}
                        gender={this.state.gender}
                        dob={this.state.dob}
                        /> }
                { formPage === 4 && <ClientNotesForm 
                        handleInputChange={this.handleInputChange}
                        notes={this.state.notes}/> }
                <div>
                    { formPage > 1 && <button onClick={this.backForm}>back</button>}
                    { formPage !== 4 && <button onClick={this.nextForm}>next</button>}
                    { formPage === 4 && <button onClick={this.submitForm}>Submit</button>}
                </div>
            </div>
            </div>
        )
    }
}

export default NewUser;