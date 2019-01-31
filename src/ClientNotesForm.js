import React from 'react'

const ClientNotesForm = (props) => {
console.log(props)
  return (
    <div>
      <form>
            <label htmlFor="notes">Client Notes:</label>
            <textarea rows="30" cols="90" id="notes" onChange={props.handleInputChange} value={props.notes}/>
            <label htmlFor="dietaryRequirements">Dietary Requirements:</label>
            <textarea rows="30" cols="90" id="dietaryRequirements" onChange={props.handleInputChange} value={props.dietaryRequirements}/>
        </form>
    </div>
  )
}

export default ClientNotesForm;