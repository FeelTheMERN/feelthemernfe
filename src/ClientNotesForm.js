import React from 'react'

const ClientNotesForm = (props) => {

  return (
    <div>
      <form>
            <label htmlFor="notes">Client Notes:</label>
            <textarea rows="30" cols="90" id="notes" onChange={props.handleInputChange} value={props.notes}/>
        </form>
    </div>
  )
}

export default ClientNotesForm;