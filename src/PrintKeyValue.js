import React, { Component } from 'react'

class PrintKeyValue extends Component {
  render() {
    console.log(this.props.obj)
    return (
      <div>
        {
          Object.entries(this.props.obj).map(([key, value]) => {
            return <p>{key}: {value}</p>
          })
        }
      </div>
    )
  }
}

export default PrintKeyValue;