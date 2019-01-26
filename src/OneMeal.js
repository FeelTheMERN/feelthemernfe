import React from 'react'

export default function OneMeal(props) {
  const {meal, day, mealIndex} = props
  return (
    <div>
      {
          meal.map((foodItem, i) => {
            return <p key={Math.random()}>{foodItem}<button onClick={() => props.deleteFood(day, mealIndex, i)}>-</button></p>
          })
      }
    </div>
  )
}
