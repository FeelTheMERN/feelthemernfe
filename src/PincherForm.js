import React, { Component } from 'react';
import axios from 'axios';

export default class PincherForm extends Component {
    state = {};

    //this function runs when the calculate button is clicked. it sends the request to the backend to calculate body fat. we recieve the bodyFat value back and set state of bodyfat on this component. we then invoke the setBodyFat function which is passed through props from ClientAttributeForm
    calcBodyFat = (e) => {
        e.preventDefault();
        // const { pincherOne, pincherTwo, pincherThree } = this.state
        // const url = "";
        // const data = { pincherOne, pincherTwo, pincherThree }
        // axios.post(url, data)
        //     .then(resp => this.setState({bodyFat: resp.data}))
        //     .catch(err => console.log(err));
        this.setState({bodyFat: 56})
        this.props.setBodyFat(this.state.bodyFat)
    }

    render() {
    return (
        <div>
            <label htmlFor="pincherOne">Pincher One:</label>
            <input type="text-field" id="pincherOne" onChange={this.handleInputChange}/>
            <label htmlFor="pincherTwo">Pincher Two:</label>
            <input type="text-field" id="pincherTwo" onChange={this.handleInputChange}/>
            <label htmlFor="pincherThree">Pincher Three:</label>
            <input type="text-field" id="pincherThree" onChange={this.handleInputChange}/>
            <button onClick={this.calcBodyFat}>Calculate</button>
        </div>
    )
    }
}
