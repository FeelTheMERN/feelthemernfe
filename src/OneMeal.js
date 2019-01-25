import React from 'react'

export default function OneMeal(props) {
  const {meal} = props
  return (
    <div>
      {
          meal.map(foodItem => {
            return <p key={Math.random()}>{foodItem}<button onClick={() => props.deleteFood()}>-</button></p>
          })
      }
    </div>
  )
}
