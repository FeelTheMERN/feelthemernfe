import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
    state = {};

    //handleInputChange keeps track of the imput fields by setting state of username and password
    handleInputChange = (e) => {
        const {value, id} = e.currentTarget;
        this.setState({[id]: value})
    }

    //redirect() redirects the user to their home page based on the user role
    redirect() {
        // needs an if statement
        this.props.history.push('/home')
    }

    //submitForm() sends the username and password using axios. we should recieve a token which is then stored on local storage. once complete it runs the redirect funtion.
    submitForm = (e) => {
        e.preventDefault();
        const { username, password } = this.state
        const url = 'http://localhost:5000/url';
        const data = { username, password }
        axios.post(url, data)
            .then(resp => { // save token to local storage
                const { token } = resp.data
                localStorage.setItem('token', token)
                this.setState({message: 'You are logged in', error: null})
                this.redirect()
                })
            .catch(err => {
                const { status } = err.response
                    if (status === 403) {
                        this.setState({error: 'Incorrect username and password', message: null})
                    }
                    console.log(err.response)
                })
    }

    render() {
        const {error, message} = this.state
        return (
            <>
                <form>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" onChange={this.handleInputChange}/>
                    <label htmlFor="password">Password:</label>
                    <input type="text" id="password" onChange={this.handleInputChange}/>
                    <button onClick={this.submitForm}>Login</button>
                </form>
            { error && <p>{error}</p>}
            { message && <p>{message}</p>}
            </>
        )
    }
}

export default Login;