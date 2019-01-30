import React from 'react'

export default function OneMeal(props) {
  const {meal} = props
  console.log(meal)
  return (
    <div>
      {
        meal.map(foodObj => {
          return <p key={Math.random()}>{foodObj.food}</p>
        })
      }
    </div>
  )
}