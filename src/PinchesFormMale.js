import React, { Component } from 'react';
import axios from 'axios';
import './css/pinchesform.scss'

export default class PinchesFormMale extends Component {
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
        const { chest, abdomen, thigh } = this.state
        const { dob, weight } = this.props
        const config = { headers: {token: localStorage.getItem('token')}}
        console.log(config)
        const url = "http://localhost:5000/admin/pinches/male";
        const data = { chest, abdomen, thigh, dob, weight }
        console.log(data)
        axios.post(url, data, config)
            .then(resp => {
                const {percBodyFat, fatMass, leanMass} = resp.data
                this.setState({bodyFat: percBodyFat, fatMass, leanMass}, () => {
                    const { bodyFat, fatMass, leanMass } = this.state
                    this.props.setBodyFat(bodyFat, fatMass, leanMass )
                    if(this.props.toggleBodyFatCalc) this.props.toggleBodyFatCalc('calculation complete')
                })
            })
            .catch(err => console.log(err.response))
    }

    render() {
    return (
        <div className="pinches">
            <label htmlFor="chest">Chest(mm):</label>
            <input type="text-field" id="chest" onChange={this.handleInputChange}/>
            <label htmlFor="abdomen">Abdoment(mm):</label>
            <input type="text-field" id="abdomen" onChange={this.handleInputChange}/>
            <label htmlFor="thigh">Thigh(mm):</label>
            <input type="text-field" id="thigh" onChange={this.handleInputChange}/>
            <button onClick={this.calcBodyFat}>Calculate</button>
        </div>
    )
    }
}
