import React, { Component } from 'react';
import axios from 'axios';

export default class PincherFormFemale extends Component {
    state = {};

    //this function runs when the calculate button is clicked. it sends the request to the backend to calculate body fat. we recieve the bodyFat value back and set state of bodyfat on this component. we then invoke the setBodyFat function which is passed through props from ClientAttributeForm
    calcBodyFat = (e) => {
        e.preventDefault();
        // const { pincherOne, pincherTwo, pincherThree } = this.state
        // const { dob } = this.props
        // const url = "";
        // const data = { pincherOne, pincherTwo, pincherThree, dob }
        // axios.post(url, data)
        //     .then(resp => this.setState({bodyFat: resp.data}))
        //     .catch(err => console.log(err));
        this.setState({bodyFat: 56, fatMass: 43, leanMass: 34}, () => {
            const { bodyFat, fatMass, leanMass } = this.state
            this.props.setBodyFat(bodyFat, fatMass, leanMass )
        })
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
