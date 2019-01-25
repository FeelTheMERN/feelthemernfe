import React from 'react'
import OneMeal from './OneMeal'

export default function DisplayMeal(props) {
  const { day } = props
  console.log(day)
  return (
    <div>
        {
            day.map((meal, i)=> {
                return (
                    <>
                    <p>Meal {i + 1} <button>Edit</button></p>
                    <OneMeal meal={meal}/>
                    </>
                )
            })
        }
    </div>
  )
}
