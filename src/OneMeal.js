import React from 'react'

export default function OneMeal(props) {
  const {meal, day, mealIndex} = props
  return (
    <>
      {meal.map((foodItem, i) => {
          return(
            <div>
              <p key={i}>{foodItem.food_name}<button onClick={() => props.deleteFood(day, mealIndex, i)}>-</button></p>
              {/* <img src={foodItem.photo.thumb} alt=""/> */}
              <p>{foodItem.serving_qty} {foodItem.serving_unit}</p>
              <p>Serving weight: {foodItem.serving_weight_grams}g</p>
              <p>Calories: {foodItem.nf_calories}g</p>
              <p>Protein: {foodItem.nf_protein}g</p>
              <p>Carbohydrate: {foodItem.nf_total_carbohydrate}g</p>
              <p>Fat: {foodItem.nf_total_fat}</p>
            </div>
          )
      })}
    </>
  )
}