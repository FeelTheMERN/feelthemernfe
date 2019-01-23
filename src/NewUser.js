import React, { Component } from 'react'
import axios from 'axios'
import AccountDetailForm from './AccountDetailForm'
import PersonalDetailForm from './PersonalDetailForm';
import ClientAttributeForm from './ClientAttributeForm';
import ClientNotesForm from './ClientNotesForm'

class NewUser extends Component {
    state = {};

    //componentDidMount() renders the first form when the page loads. It passes the component handle input change so that state is set on this page.
    componentDidMount() {
        const form = <AccountDetailForm handleInputChange={this.handleInputChange}/>
        const title = "Client Account Details"
        const formPage = 1
        this.setState({ form, title, formPage })
    }
    
    //handleInputChange keeps track of the imput fields by setting state of username and password
    handleInputChange = (e) => {
        const {value, id} = e.currentTarget;
        this.setState({[id]: value})
    }

    //redirect() redirects the user to their home page based on the user role
    redirect = (isAdmin) => {
        if(isAdmin) this.props.history.push('/admin/home')
        this.props.history.push('user/home')
    }

    //setBodyFat() is a function passed to ClientAttributeForm so that we can set state of bodyFat on this component
    setBodyFat = (value) => {
        this.setState({bodyFat: value})
        console.log("in the main set bodyfat")
    }

    //submitForm() sends the username and password using axios. we should recieve a token which is then stored on local storage. once complete it runs the redirect funtion.
    submitForm = (e) => {
        e.preventDefault();
        const { username, password } = this.state
        const url = 'http://localhost:5000/url';
        const data = { username, password }
        axios.post(url, data)//structure the data correctly before sending
    }

    //this funtion runs when the next button is clicked. it will check what page the form is currently on and will render the next component and update the page number.
    nextForm = (e) => {
        e.preventDefault();
        const { formPage } = this.state;
        
        if(formPage === 1) {
            console.log(this.state.username)
            const form = <PersonalDetailForm handleInputChange={this.handleInputChange}/>;
            const title = "Client Personal Details"
            const newformPage = formPage + 1
            this.setState({form, title, formPage: newformPage }) 
        }
        if(formPage === 2) {
            console.log(this.state.username)
            const form = <ClientAttributeForm handleInputChange={this.handleInputChange} setBodyFat={this.setBodyFat}/>;
            const title = "Client Attributes"
            const newformPage = formPage + 1
            this.setState({form, title, formPage: newformPage }) 
        }
        if(formPage === 3) {
            console.log(this.state.bodyFat)
            const form = <ClientNotesForm handleInputChange={this.handleInputChange}/>;
            const title = "Client Notes"
            const newformPage = formPage + 1
            this.setState({form, title, formPage: newformPage }) 
        }
    }

    //this funtion runs when the back button is clicked. it will check what page the form is currently on and will render the previous component and update the page number acordingly  .
    backForm = (e) => {
        e.preventDefault();
        const { formPage } = this.state;
    
        if(formPage === 2){
            const form = <AccountDetailForm handleInputChange={this.handleInputChange}/>
            const title = "Client Account Details"
            const newformPage = formPage - 1
            this.setState({ form, title, formPage: newformPage })
        }
        if(formPage === 3){
            const form = <PersonalDetailForm handleInputChange={this.handleInputChange}/>
            const title = "Client Personal Details"
            const newformPage = formPage - 1
            this.setState({ form, title, formPage: newformPage })
        }
        if(formPage === 4) {
            const form = <ClientAttributeForm handleInputChange={this.handleInputChange} setBodyFat={this.setBodyFat}/>;
            const title = "Client Attributes"
            const newformPage = formPage - 1
            this.setState({form, title, formPage: newformPage }) 
        }
    }

    render() {
        const { form, title, formPage } = this.state
        if(!form) return <h1>Loading...</h1>
        console.log(formPage)
        return (
            <>
                { title && <h1>{title}</h1>}
                { form && <>{form}</>}
                <div>
                { formPage > 1 && <button onClick={this.backForm}>back</button>}
                <button onClick={this.nextForm}>next</button>
                </div>
            </>
        )
    }
}

export default NewUser;