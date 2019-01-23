// import React from 'react'
// import PincherForm from './PincherForm'

// const ClientAttributeForm = (props) => {

//   return (
//     <div>
//       <form>
//             <label htmlFor="height">Client Height:</label>
//             <input type="text" id="height" onChange={props.handleInputChange}/>
//             <label htmlFor="weight">Client Weight:</label>
//             <input type="text" id="weight" onChange={props.handleInputChange}/>
//             <label htmlFor="bodyFat">Client Body Fat:</label>
//             <PincherForm setBodyFat={props.setBodyFat}/>
//             <input type="text" id="bodyFat" onChange={props.handleInputChange}/>
//             <label htmlFor="goalWeight">Goal Weight:</label>
//             <input type="text" id="goalWeight" onChange={props.handleInputChange}/>
//             <label htmlFor="goalBodyFat">Goal Body Fat:</label>
//             <input type="text" id="goalBodyFat" onChange={props.handleInputChange}/>
//         </form>
//     </div>
//   )
// }

// export default ClientAttributeForm;

import React, { Component } from 'react'
import PincherForm from './PincherForm'

export default class ClientAttributeForm extends Component {
  state = {};

  //this function is passed to PincherForm so that we can set state of bodyfat on this component. It then invokes the set body fat function which is passed through props from NewUser component
  setBodyFat = (value) => {
    this.setState({bodyFat: value})
    // console.log(`ClientAtt:${this.state.bodyFat}`)
    // this.props.setBodyFat(this.state.bodyFat)
  }

  componentDidUpdate = () => {
    console.log(`ClientAtt:${this.state.bodyFat}`)
    this.render()
    this.props.setBodyFat(this.state.bodyFat)
  }

  render() {
    const {handleInputChange} = this.props
    const {bodyFat} = this.state
    console.log(this.state.bodyFat)
    return (
      <div>
        <form>
             <label htmlFor="height">Client Height:</label>
             <input type="text" id="height" onChange={handleInputChange}/>
             <label htmlFor="weight">Client Weight:</label>
             <input type="text" id="weight" onChange={handleInputChange}/>
             <label htmlFor="bodyFat">Client Body Fat:</label>
             <PincherForm setBodyFat={this.setBodyFat}/>
             <input type="text" id="bodyFat" value={bodyFat} onChange={handleInputChange}/>
             <label htmlFor="goalWeight">Goal Weight:</label>
             <input type="text" id="goalWeight" onChange={handleInputChange}/>
             <label htmlFor="goalBodyFat">Goal Body Fat:</label>
             <input type="text" id="goalBodyFat" onChange={handleInputChange}/>
         </form>
      </div>
    )
  }
}
