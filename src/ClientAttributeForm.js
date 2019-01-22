import React from 'react'

const ClientAttributeForm = (props) => {

  return (
    <div>
      <form>
            <label htmlFor="height">Client Height:</label>
            <input type="text" id="height" onChange={props.handleInputChange}/>
            <label htmlFor="weight">Client Weight:</label>
            <input type="text" id="weight" onChange={props.handleInputChange}/>
            <label htmlFor="bodyFat">Client Body Fat:</label>
            <input type="text" id="bodyFat" onChange={props.handleInputChange}/>
            <label htmlFor="goalWeight">Goal Weight:</label>
            <input type="text" id="goalWeight" onChange={props.handleInputChange}/>
            <label htmlFor="goalBodyFat">Goal Body Fat:</label>
            <input type="text" id="goalBodyFat" onChange={props.handleInputChange}/>
        </form>
    </div>
  )
}

export default ClientAttributeForm;