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
    redirect = (isAdmin) => {
        console.log(isAdmin)
        console.log(this.props)
        if(isAdmin) return this.props.history.push('/admin/home')
        this.props.history.push('user/home')
    }
    

    //submitForm() sends the username and password using axios. we should recieve a token which is then stored on local storage. once complete it runs the redirect funtion.
    submitForm = (e) => {
        e.preventDefault();
        let url
        if(window.location.pathname === "/admin") url = "http://localhost:5000/admin/";
        if(window.location.pathname === "/") url = "http://localhost:5000/user/login";

        const { username, password } = this.state        
        const data = { username, password }
        console.log(url)
        axios.post(url, data)
            .then(resp => { // save token to local storage
                const { token, isAdmin } = resp.data
                localStorage.setItem('token', token)
                this.setState({message: 'You are logged in', error: null})
                this.redirect(isAdmin)
                })
            .catch(err => console.log(err))
    }

    render() {
        const {error, message} = this.state
        return (
            <>
                <form>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" onChange={this.handleInputChange}/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" onChange={this.handleInputChange}/>
                    <button onClick={this.submitForm}>Login</button>
                </form>
                { error && <p>{error}</p>}
                { message && <p>{message}</p>}
            </>
        )
    }
}

export default Login;