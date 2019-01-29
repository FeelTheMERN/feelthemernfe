import React, { Component } from 'react'
import OneMeal from './OneMeal'

export default class DisplayMeal extends Component {
  state = {}

  remove = (i, dayIndex) => {
    this.props.deleteMeal(`day${dayIndex}`, i)
  }

  render() {
    const { day, dayIndex } = this.props
    console.log(dayIndex)
    return (
      <div>
        {
          day.map((meal, i)=> {
              return (
                  <div key={i}>
                  <p>Meal {i + 1} <button onClick={() => this.remove(i, dayIndex)}>-</button><button>+ food</button></p>
                  <OneMeal meal={meal} deleteFood={this.props.deleteFood} day={`day${dayIndex}`} mealIndex={i}/>
                  </div>
              )
          })
        }
      </div>
    )
  }
}
