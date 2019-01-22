// import React from 'react'

// const PrintKeyValue = (props) => {
//   return Object.entries(props.obj).map(([key, value]) => {
//       return <p>{key}: {value}</p>
//     }
//   )
// }


// export default PrintKeyValue;

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