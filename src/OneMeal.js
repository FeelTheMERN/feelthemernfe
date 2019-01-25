import React from 'react'

export default function OneMeal(props) {
    const {meal} = props
    console.log(meal)
  return (
    <div>
      {
          meal.map(foodItem => {
            return <p>{foodItem}</p>
          })
      }
    </div>
  )
}
