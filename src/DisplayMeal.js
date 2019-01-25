import React, { Component } from 'react'
import OneMeal from './OneMeal'

export default class DisplayMeal extends Component {
  state = {}

  remove = (i, dayIndex) => {
    this.props.deleteMeal(`day${dayIndex}`, i)
  }

  render() {
    const { day, dayIndex } = this.props
    return (
      <div key={Math.random()}>
        {
            day.map((meal, i)=> {
                return (
                    <>
                    <p key={Math.random()}>Meal {i + 1} <button key={Math.random()} onClick={() => this.remove(i, dayIndex)}>-</button><button key={Math.random()}>+ food</button></p>
                    <OneMeal meal={meal} key={Math.random()} deleteFood={this.props.deleteFood} day={`day${dayIndex}`} mealIndex={i}/>
                    </>
                )
            })
        }
      </div>
    )
  }
}
