import React from 'react'

const ClientNotesForm = (props) => {

  return (
    <div>
      <form>
            <label htmlFor="height">Client Notes:</label>
            <input type="text-field" id="height" onChange={props.handleInputChange}/>
        </form>
    </div>
  )
}

export default ClientNotesForm;