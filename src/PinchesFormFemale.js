import React, { Component } from 'react';
import axios from 'axios';

export default class PinchesFormFemale extends Component {
    state = {};

    //handleInputChange keeps track of the imput fields by setting state of username and password
    handleInputChange = (e) => {
        console.log(e.currentTarget.id)
        const {value, id} = e.currentTarget;
        this.setState({[id]: value})
    }

    //this function runs when the calculate button is clicked. it sends the request to the backend to calculate body fat. we recieve the bodyFat value back and set state of bodyfat on this component. we then invoke the setBodyFat function which is passed through props from ClientAttributeForm
    calcBodyFat = (e) => {
        e.preventDefault();
        const { tricep, suprailiac, thigh } = this.state
        const { dob, weight } = this.props
        const config = { headers: {token: localStorage.getItem('token')}}
        const url = `${process.env.REACT_APP_API_URL}/admin/pinches/female`;
        const data = { tricep, suprailiac, thigh, dob, weight }
        console.log(data)
        axios.post(url, data, config)
            .then(resp => {
                const {percBodyFat, fatMass, leanMass} = resp.data
                this.setState({bodyFat: percBodyFat, fatMass, leanMass}, () => {
                    const { bodyFat, fatMass, leanMass } = this.state
                    this.props.setBodyFat(bodyFat, fatMass, leanMass )
                })
            })
            .catch(err => console.log(err));
        
    }

    render() {
    return (
        <div>
            <label htmlFor="tricep">Tricep Pincher:</label>
            <input type="text-field" id="tricep" onChange={this.handleInputChange}/>
            <label htmlFor="thigh">Thigh Pincher:</label>
            <input type="text-field" id="thigh" onChange={this.handleInputChange}/>
            <label htmlFor="suprailiac">Suprailiac Pincher:</label>
            <input type="text-field" id="suprailiac" onChange={this.handleInputChange}/>
            <button onClick={this.calcBodyFat}>Calculate</button>
        </div>
    )
    }
}
