import React, { Component } from 'react'
import PincherFormMale from './PincherFormMale'
import PincherFormFemale from './PincherFormFemale'

export default class ClientAttributeForm extends Component {
  state = {
    bodyFat: ''
  };

  //this function is passed to PincherFormMale so that we can set state of bodyfat on this component. It then invokes the set body fat function which is passed through props from NewUser component
  setBodyFat = (value1, value2, value3) => {
    this.setState({bodyFat: value1, fatMass: value2, leanMass: value3}, () => {
      const { bodyFat, fatMass, leanMass } = this.state
      this.props.setBodyFat(bodyFat, fatMass, leanMass )
    })
  }

  render() {
    const {handleInputChange, dob, gender} = this.props
    const {bodyFat} = this.state
    console.log(gender)
    return (
      <div>
        <form>
             <label htmlFor="height">Client Height:</label>
             <input type="text" id="height" onChange={handleInputChange} value={this.props.height}/>
             <label htmlFor="weight">Client Weight:</label>
             <input type="text" id="weight" onChange={handleInputChange} value={this.props.weight}/>
             
             <label>Pincher Form:</label>
             {!gender && <p>You need to define gender to use the calculator</p>}
             {gender === "male" && <PincherFormMale setBodyFat={this.setBodyFat} dob={dob}/>}
             {gender === "female" && <PincherFormFemale setBodyFat={this.setBodyFat} dob={dob}/>}

             <label htmlFor="bodyFat">Client Body Fat Percentage:</label>
             <input type="text" id="bodyFat" value={bodyFat} onChange={handleInputChange} value={this.props.bodyFat}/>
             <label htmlFor="fatMass">Fat Mass:</label>
             <input type="text" id="fatMass" onChange={handleInputChange} value={this.props.fatMass}/>
             <label htmlFor="leanMass">Lean Mass:</label>
             <input type="text" id="leanMass" onChange={handleInputChange} value={this.props.leanMass}/>

             <label htmlFor="goalWeight">Goal Weight:</label>
             <input type="text" id="goalWeight" onChange={handleInputChange} value={this.props.goalWeight}/>
             <label htmlFor="goalBodyFat">Goal Body Fat:</label>
             <input type="text" id="goalBodyFat" onChange={handleInputChange} value={this.props.goalBodyFat}/>
         </form>
      </div>
    )
  }
}
